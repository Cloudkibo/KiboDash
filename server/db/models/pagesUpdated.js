'use strict'
module.exports = (sequelize, DataTypes) => {
  const PagesUpdated = sequelize.define('PagesUpdated', {
    updateId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE
  }, {})
  PagesUpdated.associate = function (models) {
    // associations can be defined here
  }
  return PagesUpdated
}
