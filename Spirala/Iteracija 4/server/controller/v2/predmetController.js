const express = require("express");

const DbContext = require("../../models/DbContext.js");

const PredmetController = express.Router();

PredmetController.get("/all", (req, res) => {
  DbContext.Predmet.findAll()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.get("/:id", (req, res) => {
  DbContext.Predmet.findOne({ where: { id: req.params.id } })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.get("/", (req, res) => {
  DbContext.Predmet.findOne({ where: req.query })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.post("/", (req, res) => {
  let body = req.body;

  DbContext.Predmet.create({
    naziv: body.naziv,
  })
    .then((novi) => {
      res.json(novi);
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.put("/:id", (req, res) => {
  DbContext.Predmet.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result[0] === 0
          ? "Predmet: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Predmet: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.delete("/", (req, res) => {
  Predmet.destroy({ where: req.query })
    .then((result) => {
      res.json(
        result === 0
          ? "Grupa: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Grupa: Uspješno obrisano"
      );
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

PredmetController.delete("/:id", (req, res) => {
  Predmet.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result === 0
          ? "Grupa: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Grupa: Uspješno obrisano"
      );
    })
    .catch((err) => {
      console.log(`Predmet: ${err}`);
      res.status(400);
      res.json(`Predmet: ${err}`);
    });
});

module.exports = PredmetController;
