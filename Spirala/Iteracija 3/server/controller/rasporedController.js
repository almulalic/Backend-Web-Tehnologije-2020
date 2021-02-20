const express = require("express");

const RasporedService = require("../service/rasporedService");

const RasporedController = express.Router();

RasporedController.get("/:dan?", (req, res) => {
  try {
    res.setHeader("Content-Type", req.headers.accept === "text/csv" ? "text/csv" : "application/json");

    res.send(
      RasporedService.DajAktivnosti(
        req.params.dan,
        req.query.sort ? req.query.sort.slice(1) : "",
        req.query.sort ? req.query.sort[0] : "",
        req.headers.accept
      )
    );
  } catch (err) {
    res.json(err.message);
  }
});

RasporedController.post("/", (req, res) => {
  try {
    RasporedService.ValidirajFormu(req.body);
    RasporedService.DodajNovuAktivnost(req.body);
    res.json("Aktivnost dodana.");
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
});

module.exports = RasporedController;
