const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const sequelize = require("./baza.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const Imenik = require(path.join(__dirname, "./imenik.js")); // Jedini nacin na koji se mogao importati model
const Adresar = require(path.join(__dirname, "./adresar.js")); // Jedini nacin na koji se mogao importati model

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

Imenik.sync({ force: false });
Adresar.sync({ force: false });

app.get("/imenik", (req, res) => {
  Imenik.findAll({ raw: true })
    .then((response) => {
      var tabela = `
            <table>
              <thead>
                <tr>
                  <td>Ime</td>
                  <td>Prezime</td>
                  <td>Adresa</td>
                  <td>Broj Telefona</td>
                  <td>Datum Dodavanja</td>
                </tr>
              </thead>
            <tbody>`;

      response.forEach((kontakt) => {
        tabela += "<tr>";

        tabela += "<td>" + kontakt.ime + "</td>";
        tabela += "<td>" + kontakt.prezime + "</td>";
        tabela += "<td>" + kontakt.adresa + "</td>";
        tabela += "<td>" + kontakt.brojTelefona + "</td>";
        tabela += "<td>" + kontakt.datumDodavanja + "</td>";

        tabela += "</tr>";
      });

      tabela += "</tbody></table>";

      res.setHeader("Response-Type", "text/html");
      res.send(tabela);
    })
    .catch((x) => {
      console.log(x);
      res.send(x);
    });
});

app.post("/forma", (req, res) => {
  Imenik.create({
    ime: req.body.ime,
    prezime: req.body.prezime,
    adresa: req.body.adresa,
    brojTelefona: req.body.brojTelefona,
    datumDodavanja: new Date(),
  })
    .then(() => {
      res.status(200);
      res.json("Dodano");
    })
    .catch((error) => {
      res.status(400);
      res.json(error.errors[0].message);
      console.log(error);
    });
});

app.get("/poznanik/:kontakt", (req, res) => {
  Adresar.findAll({
    attributes: [],
    where: { idKontakt: req.params.kontakt },
    include: [
      {
        model: Imenik,
        attributes: ["ime", "prezime", "adresa", "brojTelefona", "datumDodavanja"],

        raw: true,
      },
    ],
    raw: true,
  })
    .then((response) => {
      response = JSON.parse(JSON.stringify(response));
      var tabela = `
      <table>
        <thead>
          <tr>
            <td>Ime</td>
            <td>Prezime</td>
            <td>Adresa</td>
            <td>Broj Telefona</td>
            <td>Datum Dodavanja</td>
          </tr>
        </thead>
      <tbody>`;

      response.forEach((kontakt) => {
        let values = Object.values(kontakt);

        tabela += "<tr>";

        tabela += "<td>" + values[0] + "</td>";
        tabela += "<td>" + values[1] + "</td>";
        tabela += "<td>" + values[2] + "</td>";
        tabela += "<td>" + values[3] + "</td>";
        tabela += "<td>" + values[4] + "</td>";

        tabela += "</tr>";
      });

      tabela += "</tbody></table>";

      res.setHeader("Response-Type", "text/html");
      res.send(tabela);
    })
    .catch((err) => {
      res.sendStatus(400);
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
