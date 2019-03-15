'use strict'
module.exports = (sequelize, DataTypes) => {
  var UserAggregate = sequelize.define('UserAggregate', {
    totalConnectedPages: DataTypes.INTEGER,
    totalPages: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER,
    companyId: DataTypes.STRING,
    companyDomain: DataTypes.STRING
  }, {})
  UserAggregate.associate = function (models) {
    // associations can be defined here
  }
  return UserAggregate
}
