'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Student.belongsTo(models.Lop);
    //  Student.belongsTo(models.Khoa);
    //  Student.hasMany(models.Subject);
     Student.hasMany(models.Qldd);
     Student.hasMany(models.Qld);
    }
  }
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    ngaysinh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};