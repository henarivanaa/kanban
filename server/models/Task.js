'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model {}
  Task.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING
  }, { sequelize })
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};