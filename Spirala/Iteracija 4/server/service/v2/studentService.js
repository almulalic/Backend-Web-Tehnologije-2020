const DbContext = require("../../models/DbContext.js");

class StudentService {
  static DajSveStudente() {
    return new Promise((resolve, reject) => {
      DbContext.Student.findAll({
        include: [{ model: DbContext.Grupa, as: "grupe", through: { attributes: [] } }],
      })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }

  static DajStudentaPoId(id) {
    return new Promise((resolve, reject) => {
      DbContext.Student.findOne({
        include: [{ model: DbContext.Grupa, as: "grupe", through: { attributes: [] } }],
        where: { id: id },
      })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }

  static DajStudentaPoInfo(index) {
    return new Promise((resolve, reject) => {
      DbContext.Student.findOne({
        include: [
          {
            model: DbContext.Grupa,
            as: "grupe",
            through: { attributes: [{ model: DbContext.Predmet, through: { attributes: [] } }] },
          },
        ],
        where: { index: index },
      })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }

  static DodajStudenta(body, grupaId) {
    return new Promise((resolve, reject) => {
      DbContext.Student.create({
        ime: body.ime,
        index: body.index,
        grupaId: grupaId || null,
      })
        .then((result) => {
          resolve(result.dataValues.id);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }

  static IzmjeniStudenta(id, body) {
    return new Promise((resolve, reject) => {
      DbContext.Student.update(body, { where: { id: id } })
        .then((result) => {
          resolve(result[0]);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }

  static ObrisiStudenta(id) {
    return new Promise((resolve, reject) => {
      DbContext.Student.destroy({ where: { id: id } })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(`Student: ${err}`);
          reject(err);
        });
    });
  }
}

module.exports = StudentService;
