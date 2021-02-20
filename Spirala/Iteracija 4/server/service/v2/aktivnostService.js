const Aktivnost = require("../../models/grupa");

const DbContext = require("../../models/DbContext.js");
class AktivnostService {
  static DajSveAktivnosti() {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.findAll()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }

  static DajAktivnostPoId(id) {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.findOne({ where: { id: id } })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }

  static DajAktivnostiPoQuery(query) {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.findOne({ where: query })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }

  static DodajAktivnost(body) {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.create(body)
        .then((result) => {
          resolve(result.dataValues.id);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }

  static IzmjeniGrupu(id, body) {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.update(body, { where: { id: id } })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }

  static ObrisiAktivnosta(id) {
    return new Promise((resolve, reject) => {
      DbContext.Aktivnost.destroy({ where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(`Aktivnost: ${err}`);
          reject(err);
        });
    });
  }
}

module.exports = AktivnostService;
