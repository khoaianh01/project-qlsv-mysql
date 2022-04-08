'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Subject.hasMany(models.Qld);
      Subject.hasMany(models.Qldd);
      // Subject.belongsTo(models.Student)
    }
  }
  Subject.init({
    nameS: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};