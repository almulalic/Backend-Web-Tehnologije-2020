const express = require("express");

const PredmetiController = express.Router();

const PredmetiService = require("../../service/v1/predmetiService");

PredmetiController.get("/", (req, res) => {
  res.json(PredmetiService.DajSvePredmete());
});

module.exports = PredmetiController;
