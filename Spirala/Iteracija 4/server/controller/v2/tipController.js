const express = require("express");

const DbContext = require("../../models/DbContext.js");

const TipController = express.Router();

TipController.get("/all", (req, res) => {
  DbContext.Tip.findAll()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Tip: ${err}`);
      res.status(400);
      res.json(`Tip: ${err}`);
    });
});

TipController.get("/:id", (req, res) => {
  DbContext.Tip.findOne({ where: { id: req.params.id } })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Tip: ${err}`);
      res.status(400);
      res.json(`Tip: ${err}`);
    });
});

TipController.post("/", (req, res) => {
  let body = req.body;

  DbContext.Tip.create({
    naziv: body.naziv,
  })
    .then(() => {
      res.json("Tip: Uspješno dodan");
    })
    .catch((err) => {
      console.log(`Tip: ${err}`);
      res.status(400);
      res.json(`Tip: ${err}`);
    });
});

TipController.put("/:id", (req, res) => {
  DbContext.Tip.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result[0] === 0
          ? "Tip: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Tip: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      console.log(`Tip: ${err}`);
      res.status(400);
      res.json(`Tip: ${err}`);
    });
});

TipController.delete("/:id", (req, res) => {
  DbContext.Tip.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result === 0
          ? "Tip: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Tip: Uspješno obrisano"
      );
    })
    .catch((err) => {
      console.log(`Tip: ${err}`);
      res.status(400);
      res.json(`Tip: ${err}`);
    });
});

module.exports = TipController;
