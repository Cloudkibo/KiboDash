'use strict'
module.exports = (sequelize, DataTypes) => {
  let TotalPlatformwiseAnalytics = sequelize.define('TotalPlatformwiseAnalytics', {
    totalConnectedPages: DataTypes.INTEGER,
    totalPages: DataTypes.INTEGER,
    totalUsers: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER
  }, {})
  TotalPlatformwiseAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return TotalPlatformwiseAnalytics
}
