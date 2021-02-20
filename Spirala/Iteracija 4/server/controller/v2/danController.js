const express = require("express");

const DbContext = require("../../models/DbContext.js");

const DanController = express.Router();

DanController.get("/all", (req, res) => {
  DbContext.Dan.findAll()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Dan: ${err}`);
      res.status(400);
      res.json(`Dan: ${err}`);
    });
});

DanController.get("/:id", (req, res) => {
  DbContext.Dan.findOne({ where: { id: req.params.id } })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(`Dan: ${err}`);
      res.status(400);
      res.json(`Dan: ${err}`);
    });
});

DanController.post("/", (req, res) => {
  let body = req.body;

  DbContext.Dan.create({
    naziv: body.naziv,
  })
    .then(() => {
      res.json("Dan: Uspješno dodan");
    })
    .catch((err) => {
      console.log(`Dan: ${err}`);
      res.status(400);
      res.json(`Dan: ${err}`);
    });
});

DanController.put("/:id", (req, res) => {
  DbContext.Dan.update(req.body, { where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result[0] === 0
          ? "Dan: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Da: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      console.log(`Dan: ${err}`);
      res.status(400);
      res.json(`Dan: ${err}`);
    });
});

DanController.delete("/:id", (req, res) => {
  DbContext.Dan.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(
        result === 0
          ? "Dan: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Dan: Uspješno obrisano"
      );
    })
    .catch((err) => {
      console.log(`Dan: ${err}`);
      res.status(400);
      res.json(`Dan: ${err}`);
    });
});

module.exports = DanController;
