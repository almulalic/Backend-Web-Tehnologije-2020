const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
const path = require("path");
const Imenik = require(path.join(__dirname, "./imenik.js")); // Jedini nacin na koji se mogao importati model

const Adresar = sequelize.define("Adresar", {
  idKontakt: Sequelize.INTEGER,
  idPoznanik: Sequelize.INTEGER,
  datumDodavanja: Sequelize.DATE,
});

module.exports = Adresar;
