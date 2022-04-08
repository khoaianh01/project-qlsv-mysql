'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qld extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Qld.belongsTo(models.Student);
      Qld.belongsTo(models.Subject)
    }
  }
  Qld.init({
    diem: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Qld',
  });
  return Qld;
};