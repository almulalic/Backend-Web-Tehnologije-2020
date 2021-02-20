const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const path = require("path");

const Adresar = require(path.join(__dirname, "./adresar.js")); // Jedini nacin na koji se mogao importati model

const Imenik = sequelize.define("Imenik", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ime: Sequelize.STRING,
  prezime: Sequelize.STRING,
  adresa: Sequelize.STRING,
  brojTelefona: {
    type: Sequelize.STRING,
    validate: {
      is: {
        args: [/[0-9]{3}\/[0-9]{3}\-[0-9]{3}/],
        msg: "Nije pravilan format broja telefona",
      },
    },
  },
  datumDodavanja: Sequelize.DATE,
});

Adresar.belongsTo(Imenik, { foreignKey: "idKontakt", targetKey: "id" });
Adresar.belongsTo(Imenik, { foreignKey: "idPoznanik", targetKey: "id" });

module.exports = Imenik;
