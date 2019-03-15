'use strict'
module.exports = (sequelize, DataTypes) => {
  const PlatformAggregate = sequelize.define('PlatformAggregate', {
    totalConnectedPages: DataTypes.INTEGER,
    totalPages: DataTypes.INTEGER,
    totalUsers: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER
  }, {})
  PlatformAggregate.associate = function (models) {
    // associations can be defined here
  }
  return PlatformAggregate
}
