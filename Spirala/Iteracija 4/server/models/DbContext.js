const Sequelize = require("sequelize");
const DbContext = {};

const sequelize = new Sequelize("bwtST-96", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

DbContext.Sequelize = Sequelize;
DbContext.sequelize = sequelize;

//#region Models Import

DbContext.Grupa = sequelize.import(__dirname + "/grupa.js");
DbContext.Predmet = sequelize.import(__dirname + "/predmet.js");
DbContext.Aktivnost = sequelize.import(__dirname + "/aktivnost.js");
DbContext.Dan = sequelize.import(__dirname + "/dan.js");
DbContext.Tip = sequelize.import(__dirname + "/tip.js");
DbContext.Student = sequelize.import(__dirname + "/student.js");
DbContext.GrupaStudenti = sequelize.import(__dirname + "/grupaStudenti.js");

//#endregion

//#region Predmet (1) => Grupa (N)

DbContext.Predmet.hasMany(DbContext.Grupa, {
  as: "predmet",
  foreignKey: "predmetId",
});

DbContext.Grupa.belongsTo(DbContext.Predmet, {
  as: "grupe",
  foreignKey: "predmetId",
});

//#endregion

//#region Aktivnost (N) => Predmet (1)

DbContext.Predmet.hasMany(DbContext.Aktivnost, {
  as: "aktivnosti",
  foreignKey: "predmetId",
});

DbContext.Aktivnost.belongsTo(DbContext.Predmet, {
  as: "predmet",
  foreignKey: "predmetId",
});

//#endregion

//#region Aktivnost (N) => Grupa (0)

DbContext.Grupa.hasMany(DbContext.Aktivnost, {
  as: "aktivnosti",
  foreignKey: "grupaId",
  allowNull: true,
});

DbContext.Aktivnost.belongsTo(DbContext.Grupa, {
  as: "grupa",
  foreignKey: "grupaId",
  allowNull: true,
});

//#endregion

//#region Aktivnost (N) => Dan (1)

DbContext.Dan.hasMany(DbContext.Aktivnost, {
  as: "aktivnosti",
  foreignKey: "danId",
});

DbContext.Aktivnost.belongsTo(DbContext.Dan, {
  as: "dan",
  foreignKey: "danId",
});

//#endregion

//#region Aktivnost (N) => Tip (1)

DbContext.Tip.hasMany(DbContext.Aktivnost, {
  as: "aktivnosti",
  foreignKey: "tipId",
});

DbContext.Aktivnost.belongsTo(DbContext.Tip, {
  as: "tip",
  foreignKey: "tipId",
});

//#endregion

//#region Student (N) => Grupa (M)

DbContext.Grupa.belongsToMany(DbContext.Student, {
  as: "studenti",
  foreignKey: "grupaId",
  through: DbContext.GrupaStudenti,
});

DbContext.Student.belongsToMany(DbContext.Grupa, {
  as: "grupe",
  foreignKey: "studentId",
  through: DbContext.GrupaStudenti,
});

//#endregion

module.exports = DbContext;
