const express = require("express");

const DbContext = require("../../models/DbContext.js");
const AktivnostService = require("../../service/v2/aktivnostService");

const AktivnostController = express.Router();

AktivnostController.get("/all", (req, res) => {
  DbContext.Aktivnost.findAll({
    include: [
      { model: DbContext.Predmet, as: "predmet" },
      { model: DbContext.Grupa, as: "grupa" },
      { model: DbContext.Tip, as: "tip" },
      { model: DbContext.Dan, as: "dan" },
    ],
  })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Aktivnost: ${err}`);
      res.status(400);
      res.json(`Aktivnost: ${err}`);
    });
});

AktivnostController.get("/:id", (req, res) => {
  AktivnostService.DajAktivnostPoId(req.params.id)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Aktivnost: ${err}`);
    });
});

AktivnostController.get("/", (req, res) => {
  AktivnostService.DajAktivnostiPoQuery(req.query)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Aktivnost: ${err}`);
    });
});

function validiraj(body) {
  if (!body.naziv || body.naziv == "") return "Naziv ne smije biti prazan";
  if (!body.pocetak || body.pocetak == "") return "Pocetak ne smije biti prazan";
  if (!body.kraj || body.kraj == "") return "Kraj ne smije biti prazan";

  if (isNaN(Number(body.pocetak.replace(",", ".")))) return "Pocetak mora biti broj";
  if (isNaN(Number(body.kraj.replace(",", ".")))) return "Kraj mora biti broj";

  return "true";
}

AktivnostController.post("/", (req, res) => {
  let body = req.body;
  let validacija = validiraj(body);

  if (validacija == "true") {
    AktivnostService.DodajAktivnost({
      naziv: body.naziv,
      pocetak: parseFloat(body.pocetak.replace(",", ".")),
      kraj: parseFloat(body.kraj.replace(",", ".")),
      grupaId: body.grupaId || null,
      predmetId: body.predmetId || null,
      danId: body.danId || null,
      tipId: body.tipId || null,
    })
      .then((insertID) => {
        res.json("Aktivnost uspješno dodana. ID: " + insertID);
      })
      .catch((err) => {
        res.status(400);
        res.json(`Aktivnost: ${err}`);
      });
  } else {
    res.status(400);
    res.json(validacija);
  }
});

AktivnostController.put("/:id", (req, res) => {
  DbContext.Aktivnost.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result[0] === 0
          ? "ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Uspješno modifikovano"
      );
    })
    .catch((err) => {
      console.log(`Aktivnost: ${err}`);
      res.status(400);
      res.json(`Aktivnost: ${err}`);
    });
});

AktivnostController.delete("/:id", (req, res) => {
  DbContext.Aktivnost.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result === 0
          ? "ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Uspješno obrisano"
      );
    })
    .catch((err) => {
      console.log(`Aktivnost: ${err}`);
      res.status(400);
      res.json(`Aktivnost: ${err}`);
    });
});

AktivnostController.get("/test", (req, res) => {});

module.exports = AktivnostController;
