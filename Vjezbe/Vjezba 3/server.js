var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    switch (req.method) {
      case "GET":
        const parametri = url.parse(req.url, true);
        const q = parametri.query.q;

        fs.readFile("./imenik.txt", "utf8", (err, data) => {
          const redovi = data.split("\n");

          let niz = [];

          redovi.forEach((x) => {
            let info = x.split(",");
            let ime = info[0].trim();

            if (q && ime.toLowerCase().match(q.toLowerCase()))
              niz.push({
                ime: info[0].trim(),
                prezime: info[1].trim(),
                adresa: info[2].trim(),
                broj_telefona: info[3].trim(),
              });
            else if (!q)
              niz.push({
                ime: info[0].trim(),
                prezime: info[1].trim(),
                adresa: info[2].trim(),
                broj_telefona: info[3].trim(),
              });
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(niz));
        });
        break;
      case "POST":
        console.log("POST");
        break;
    }
  })
  .listen(8080, () => {
    console.log("Listening on port 8080...");
  });
