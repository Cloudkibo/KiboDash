'use strict'
module.exports = (sequelize, DataTypes) => {
  let TotalPageAnalytics = sequelize.define('TotalPageAnalytics', {
    pageId: DataTypes.STRING,
    pageName: DataTypes.STRING,
    pageLikes: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER,
    page_id: DataTypes.STRING
  }, {})
  TotalPageAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return TotalPageAnalytics
}
