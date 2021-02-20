const express = require("express");

const GrupaService = require("../../service/v2/grupaService");
const StudentService = require("../../service/v2/studentService");

const StudentController = express.Router();

StudentController.get("/all", (req, res) => {
  StudentService.DajSveStudente()
    .then((studenti) => {
      res.json(studenti);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

StudentController.get("/:id", (req, res) => {
  StudentService.DajStudentaPoId(req.params.id)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

StudentController.get("/", (req, res) => {
  StudentService.DajStudentaPoInfo(req.query)
    .then((poruka) => {
      res.json(poruka);
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

StudentController.post("/", async (req, res) => {
  let body = req.body;
  let keys = ["ime", "index"];

  let json = body.csv.split("\n").map((red) => {
    let values = red.split(",");
    return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
  });

  if (json[json.length - 1].ime == "" || !json[json.length - 1].index) json.pop();

  let neuspjeli = [];
  let noviId;

  await Promise.all(
    json.map(async (student) => {
      let trenutniStudent = await StudentService.DajStudentaPoInfo(student.index);

      if (trenutniStudent == null) {
        try {
          noviId = await StudentService.DodajStudenta(student);

          try {
            await GrupaService.PoveziStudentaSaGrupom(noviId, body.grupaId);
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          neuspjeli.push(
            `Student1: Ime:${student.ime} Index:${student.index} nije kreiran zbog greske na serveru.`
          );
        }
      } else if (student.ime === trenutniStudent.dataValues.ime) {
        trenutniStudent = trenutniStudent.dataValues;

        if (trenutniStudent.grupe.length > 0) {
          let grupa = await GrupaService.DajGrupuPoId(body.grupaId);

          if (grupa != null) {
            grupa = grupa.dataValues;

            let grupeIzPredmeta = trenutniStudent.grupe.filter(
              (x) => x.dataValues.predmetId === grupa.predmetId
            );

            if (grupeIzPredmeta.length > 0) {
              let grupaId = grupeIzPredmeta[0].dataValues.id;

              if (grupaId !== grupa.id) {
                try {
                  await GrupaService.IzmjeniGrupuZaStudenta(trenutniStudent.id, body.grupaId, grupaId);
                } catch (err) {
                  console.log(err);
                }
              }
            } else
              neuspjeli.push(
                `${student.ime} nije kreiran jer postoji student ${trenutniStudent.ime} sa istim indexom ${trenutniStudent.index}`
              );
          } else
            neuspjeli.push(
              `${student.ime} nije kreiran jer postoji student ${trenutniStudent.ime} sa istim indexom ${trenutniStudent.index}`
            );
        } else
          neuspjeli.push(
            `${student.ime} nije kreiran jer postoji student ${trenutniStudent.dataValues.ime} sa istim indexom ${trenutniStudent.dataValues.index}`
          );
      } else
        neuspjeli.push(
          `${student.ime} nije kreiran jer postoji student ${trenutniStudent.dataValues.ime} sa istim indexom ${trenutniStudent.dataValues.index}`
        );
    })
  ).then(() => {
    res.json(neuspjeli);
  });
});

StudentController.post("/raw", (req, res) => {
  StudentService.DodajStudenta(req.body)
    .then(async (noviId) => {
      if (req.body.grupaId) {
        await GrupaService.PoveziStudentaSaGrupom(noviId, req.body.grupaId);
      }
      res.json("Student uspješno dodan!");
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

StudentController.put("/:id", (req, res) => {
  StudentService.IzmjeniStudenta(req.params.id, req.body)
    .then((poruka) => {
      res.json(
        poruka === 0
          ? "Student: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Student: Uspješno modifikovan"
      );
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

StudentController.delete("/:id", (req, res) => {
  StudentService.ObrisiStudenta(req.params.id)
    .then((poruka) => {
      res.json(
        poruka === 0
          ? "Student: ID ne postoji ili neko polje nije ispravno, stanje u bazi nepromjenjeno"
          : "Student: Uspješno obrisano"
      );
    })
    .catch((err) => {
      res.status(400);
      res.json(`Student: ${err}`);
    });
});

module.exports = StudentController;
