'use strict'
module.exports = (sequelize, DataTypes) => {
  let TotalUserwiseAnalytics = sequelize.define('TotalUserwiseAnalytics', {
    companyId: DataTypes.STRING,
    companyDomain: DataTypes.STRING,
    totalConnectedPages: DataTypes.INTEGER,
    totalPages: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER
  }, {})
  TotalUserwiseAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return TotalUserwiseAnalytics
}
