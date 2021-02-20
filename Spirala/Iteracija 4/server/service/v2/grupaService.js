const DbContext = require("../../models/DbContext");

class GrupaService {
  static DajSveGrupe() {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.findAll()
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static DajGrupuPoId(id) {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.findOne({ where: { id: id } })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static DajGrupuPoQuery(query) {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.findOne({ where: query })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static DodajGrupu(body) {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.create({
        naziv: body.naziv,
        predmetId: body.predmetId || null,
      })
        .then((result) => {
          resolve(result.dataValues.id);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static PoveziStudentaSaGrupom(studentId, grupaId) {
    return new Promise((resolve, reject) => {
      DbContext.GrupaStudenti.create({
        studentId: studentId,
        grupaId: grupaId,
      })
        .then((result) => {
          resolve(result.dataValues.id);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static IzmjeniGrupuZaStudenta(studentId, novaGrupa, staraGrupa) {
    return new Promise((resolve, reject) => {
      DbContext.GrupaStudenti.update(
        {
          grupaId: Number(novaGrupa),
        },
        {
          where: {
            studentId: Number(studentId),
            grupaId: Number(staraGrupa),
          },
        }
      )
        .then((result) => {
          console.log(result);
          resolve(result.dataValues);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static ObrisiGrupuStudenta(studentId, grupaId) {
    return new Promise((resolve, reject) => {
      DbContext.GrupaStudenti.destroy({ where: { studentId: studentId, grupaId: grupaId } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static IzmjeniGrupu(id, body) {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.update(body, { where: { id: id } })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }

  static ObrisiGrupu(id) {
    return new Promise((resolve, reject) => {
      DbContext.Grupa.destroy({ where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(`Grupa: ${err}`);
          reject(err);
        });
    });
  }
}

module.exports = GrupaService;
