'use strict'
module.exports = (sequelize, DataTypes) => {
  let TotalPagewiseAnalytics = sequelize.define('TotalPagewiseAnalytics', {
    pageId: DataTypes.STRING,
    pageName: DataTypes.STRING,
    pageLikes: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER
  }, {})
  TotalPagewiseAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return TotalPagewiseAnalytics
}
