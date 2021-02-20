const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));

app.get("/unos", (req, res) => {
  res.sendFile("./forma.html", { root: __dirname + "/views" });
});

function generisiTabelu() {
  tabela = `
    <table>
    <thead>
      <tr>
        <td>Ime</td>
        <td>Prezime</td>
        <td>Adresa</td>
        <td>Broj Telefona</td>
        <td>Akcije</td>
      <tr>
    </thead>
    <tbody>
  `;

  fs.readFileSync("./imenik.txt")
    .toString()
    .split("\n")
    .forEach((x) => {
      let podaci = x.split(",");

      if (podaci.length == 4)
        tabela += `
        <tr>
          <td>${podaci[0]}</td>
          <td>${podaci[1]}</td>
          <td>${podaci[2]}</td>
          <td>${podaci[3]}</td>
          <td><button type="button" onclick="izbrisi('${podaci[0]}')">delete</button></td>
          <td><button type="button" onclick="izmjeni('${podaci[0]}')">edit</button></td>
        </tr>
      `;
    });

  tabela += `
  </tbody>
  </table>`;

  tabela += ` 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
    
    function izmjeni(ime) {
      window.location.href = "http://localhost:8085/" + ime;
    }

    function izbrisi(ime) {
      $.ajax({
        url: "http://localhost:8085/" + ime,
        method: "POST",
        success: location.reload()
      });
    }

    </script>
  `;

  return tabela;
}

app.get("/", (req, res) => {
  res.send(generisiTabelu());
});

app.post("/:ime", (req, res) => {
  fs.writeFileSync(
    "imenik.txt",
    fs
      .readFileSync("imenik.txt")
      .toString()
      .split("\n")
      .filter((x) => {
        let split = x.split(",");
        return split[0] != req.params.ime;
      })
  );

  res.send(generisiTabelu());
});

app.get("/:ime", (req, res) => {
  let korisnik = fs
    .readFileSync("imenik.txt")
    .toString()
    .split("\n")
    .filter((x) => {
      let split = x.split(",");
      return split[0] == req.params.ime;
    })[0];

  korisnik = korisnik.split(",");

  let forma = ` 
    <form action="http://localhost:8085/" method="POST">
      <label for="ime">Ime</label>
      <input type="text" id="ime" value="${korisnik[0]}" />
      <label for="prezime">Prezime</label>
      <input type="text" id="prezime" value="${korisnik[1]}"/>
      <label for="adresa">Adresa</label>
      <input type="text" id="adresa" value="${korisnik[2]}"/>
      <label for="broj_telefona">Broj Telefona</label>
      <input type="text" id="broj_telefona" value="${korisnik[3]}"/>
      <button type="submit">Submit</button>
    </form>
  `;

  res.send(korisnik.length == 4 ? forma : '<p style="color:red">Korisnik ne postoji</p>');
});

app.post("/", function (req, res) {
  let tijelo = req.body;
  let novaLinija =
    "\n" + tijelo["ime"] + "," + tijelo["prezime"] + "," + tijelo["adresa"] + "," + tijelo["broj_telefona"];
  fs.appendFile("imenik.txt", novaLinija, function (err) {
    if (err) throw err;
    res.json({ message: "Uspješno dodan red", data: novaLinija });
  });
});

app.listen(8085);
