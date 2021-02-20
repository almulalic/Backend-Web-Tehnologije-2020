module.exports = function (sequelize, DataTypes) {
  const GrupaStudenti = sequelize.define(
    "GrupaStudenti",
    {},
    {
      freezeTableName: true,
    }
  );

  return GrupaStudenti;
};
