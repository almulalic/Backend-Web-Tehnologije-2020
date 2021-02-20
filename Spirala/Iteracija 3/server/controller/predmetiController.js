const express = require("express");

const PredmetiController = express.Router();

const PredmetiService = require("../service/predmetiService");

PredmetiController.get("/", (req, res) => {
  res.json(PredmetiService.DajSvePredmete());
});

module.exports = PredmetiController;
