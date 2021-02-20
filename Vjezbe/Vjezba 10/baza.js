const Sequelize = require("sequelize");

const sequelize = new Sequelize("vjezba9", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = sequelize;
