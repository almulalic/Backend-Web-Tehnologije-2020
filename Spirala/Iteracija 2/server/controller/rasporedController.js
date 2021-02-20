const express = require("express");
const cors = require("cors");

const RasporedService = require("../service/rasporedService");
const CSVParser = require("../common/CSVParser");

const RasporedController = express.Router();
RasporedController.use(cors());

RasporedController.post("/", (req, res) => {
  try {
    RasporedService.ValidirajFormu(req.body);
    RasporedService.ProvjeriValidnostVremena(req.body);
    RasporedService.DodajNovuAktivnost(req.body);
    res.json("Aktivnost uspjesno kreirana.");
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
});

RasporedController.get("/:dan?", (req, res) => {
  try {
    res.setHeader("Content-Type", req.headers.accept === "text/csv" ? "text/csv" : "application/json");
    res.send(RasporedService.DajAktivnostiZaDan(req.params.dan, req.headers.accept, req.query));
  } catch (err) {
    res.json([]);
  }
});

module.exports = RasporedController;
