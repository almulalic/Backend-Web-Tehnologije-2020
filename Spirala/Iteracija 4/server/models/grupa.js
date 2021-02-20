module.exports = function (sequelize, DataTypes) {
  const Grupa = sequelize.define(
    "Grupa",
    {
      naziv: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Grupa;
};
