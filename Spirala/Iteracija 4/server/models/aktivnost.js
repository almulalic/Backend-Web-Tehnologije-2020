module.exports = function (sequelize, DataTypes) {
  const Aktivnost = sequelize.define(
    "Aktivnost",
    {
      naziv: DataTypes.STRING,
      pocetak: DataTypes.FLOAT,
      kraj: DataTypes.FLOAT,
    },
    {
      freezeTableName: true,
    }
  );

  return Aktivnost;
};
