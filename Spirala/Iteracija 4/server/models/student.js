module.exports = function (sequelize, DataTypes) {
  const Student = sequelize.define(
    "Student",
    {
      ime: DataTypes.STRING,
      index: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Student;
};
