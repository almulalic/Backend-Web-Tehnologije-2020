module.exports = function (sequelize, DataTypes) {
  const Tip = sequelize.define(
    "Tip",
    {
      naziv: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Tip;
};
