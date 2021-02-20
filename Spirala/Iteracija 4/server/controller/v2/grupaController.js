const express = require("express");

const DbContext = require("../../models/DbContext.js");

const GrupaService = require("../../service/v2/grupaService");

const GrupaController = express.Router();

GrupaController.get("/all", (req, res) => {
  GrupaService.DajSveGrupe(req.query)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.get("/:id", (req, res) => {
  GrupaService.DajGrupuPoId(req.params.id)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.get("/:id", (req, res) => {
  GrupaService.DajGrupuPoQuery(req.query)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.post("/", (req, res) => {
  GrupaService.DodajGrupu(req.body)
    .then((poruka) => {
      res.json("Grupa uspješno dodana!");
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.put("/student/:uid/grupa/:gid", (req, res) => {
  GrupaService.PoveziStudentaSaGrupom(req.params.uid, req.params.gid)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.delete("/:id", (req, res) => {
  GrupaService.ObrisiGrupuStudenta(req.params.uid, req.params.gid)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.put("/:id", (req, res) => {
  GrupaService.IzmjeniGrupu(req.params.id, req.body)
    .then((result) => {
      res.json(
        result === 0
          ? "Grupa: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Grupa: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

GrupaController.delete("/:id", (req, res) => {
  GrupaService.ObrisiGrupu(req.params.id, req.body)
    .then((result) => {
      res.json(
        result === 0
          ? "Grupa: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Grupa: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      res.status(400);
      res.json(`Grupa: ${err}`);
    });
});

module.exports = GrupaController;
