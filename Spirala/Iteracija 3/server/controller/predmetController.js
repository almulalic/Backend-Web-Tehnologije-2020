const express = require("express");

const PredmetController = express.Router();

const PredmetiService = require("../service/predmetiService");

PredmetController.get("/:naziv", (req, res) => {
  res.json(PredmetiService.DajPredmet(req.params.naziv) || null);
});

PredmetController.get("/:naziv/brojAktivnosti", (req, res) => {
  res.json(PredmetiService.DajAktivnostiZaPredmet(req.params.naziv).length);
});

PredmetController.get("/:naziv/aktivnosti", (req, res) => {
  res.json(PredmetiService.DajAktivnostiZaPredmet(req.params.naziv));
});

PredmetController.post("/", (req, res) => {
  if (PredmetiService.DajPredmet(req.body.naziv)) res.json("Predmet postoji");
  else {
    PredmetiService.DodajPredmet(req.body.naziv);
    res.json("Predmet dodan");
  }
});

PredmetController.delete("/:naziv", (req, res) => {
  let brojAktivnosti = PredmetiService.DajAktivnostiZaPredmet(req.params.naziv).length;

  if (brojAktivnosti == 0 && PredmetiService.DajPredmet(req.params.naziv)) {
    PredmetiService.ObrisiPredmet(req.params.naziv);
    res.json("Predmet obrisan");
  } else {
    res.status(400);

    if (brojAktivnosti > 0) res.json("Greška pri brisanju, predmet se koristi u jednoj ili više aktivnosti");
    else res.json("Greška pri brisanju, Predmet ne postoji.");
  }
});

module.exports = PredmetController;
