'use strict'
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    startDateTime: DataTypes.DATE,
    endDateTime: DataTypes.DATE,
    aggregateType: DataTypes.STRING,
    status: DataTypes.STRING
  }, {})
  History.associate = function (models) {
    // associations can be defined here
  }
  return History
}
