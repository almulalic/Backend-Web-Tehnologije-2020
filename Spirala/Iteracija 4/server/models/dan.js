module.exports = function (sequelize, DataTypes) {
  const Dan = sequelize.define(
    "Dan",
    {
      naziv: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Dan;
};
