module.exports = function (sequelize, DataTypes) {
  const Predmet = sequelize.define(
    "Predmet",
    {
      naziv: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Predmet;
};
