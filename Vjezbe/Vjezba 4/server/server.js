var http = require("http");

const fs = require("fs");
const url = require("url");
var o2x = require("object-to-xml");

let users = [];

function parseCSV() {
  const rawRows = fs.readFileSync("./users.csv", { encoding: "utf8", flag: "r" }).split("\n");

  let users = [];

  rawRows.forEach((delimitedUser) => {
    const user = delimitedUser.split(",").map((x) => {
      const index = x.indexOf(":");
      return [x.slice(0, index).trim(), x.slice(index + 1).trim()];
    });
    if (user.length === 5) users.push(Object.fromEntries(user));
  });

  return users;
}

function checkPassword(attemptedPassword, storedPassword) {
  return (
    attemptedPassword
      .split("")
      .map((c) => {
        return String.fromCharCode((c.charCodeAt(0) % 16) + 55);
      })
      .join("") === storedPassword
  );
}

function XMLResponseBuilder(successful, userObject) {
  return o2x({
    loginSuccessful: successful ? "Successful" : "Failed",
    date: new Date(),
    user: userObject,
  });
}

function JSONResponseBuilder(userObject, headers) {
  //password ne vracam zbog sigurnosnih razloga ali se ovde vidi da se moze lagano dodati
  return JSON.stringify(
    Object.fromEntries(
      headers.map((x) => {
        return [x, userObject[x]];
      })
    )
  );
}

function login(body) {
  let user = users.find((x) => body.username === x.username);

  if (!user) throw Error("User nije pronadjen");
  else if (!checkPassword(body.password, user.password)) throw Error("Pogresan password");

  return {
    username: user.username,
    name: user.name,
    password: user.password,
    surname: user.surname,
    role: user.role,
  };
}

http
  .createServer((req, res) => {
    switch (req.method) {
      case "POST":
        if (req.url.match("/user/login")) {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });

          req.on("end", () => {
            const parametri = new url.URLSearchParams(body);
            const urlParametri = Object.values(url.parse(req.url, true).query);

            try {
              let user = login({
                username: parametri.get("username"),
                password: parametri.get("password"),
              });

              if (urlParametri.length > 0) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSONResponseBuilder(user, urlParametri));
              } else {
                res.writeHead(200, { "Content-Type": "application/xml" });
                res.end(XMLResponseBuilder(true, user));
              }
            } catch (err) {
              // moze se dodat i da je response 400 ili čak 403 zavisi od konteksta
              if (urlParametri.length > 0) {
                res.writeHead(401, { "Content-Type": "application/json" });
                res.end(JSONResponseBuilder({ username: parametri.get("username") }, urlParametri));
              } else {
                res.writeHead(401, { "Content-Type": "application/xml" });
                res.end(XMLResponseBuilder(false, { username: parametri.get("username") }).toString());
              }
            }
          });
        }
    }
  })
  .listen(8080, async () => {
    users = await parseCSV(); // Jednom ucitavam csv kad se server pokrene da ne moram svaki put parsirati, a posto se csv ne mjenja uvijek ce biti validan
    console.log("Listening on port 8080...");
  });
