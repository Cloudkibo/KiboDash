'use strict'
module.exports = (sequelize, DataTypes) => {
  const PageAggregate = sequelize.define('PageAggregate', {
    pageId: DataTypes.STRING,
    pageName: DataTypes.STRING,
    pageLikes: DataTypes.INTEGER,
    totalSubscribers: DataTypes.INTEGER,
    totalBroadcasts: DataTypes.INTEGER,
    totalPolls: DataTypes.INTEGER,
    totalSurveys: DataTypes.INTEGER
  }, {})
  PageAggregate.associate = function (models) {
    // associations can be defined here
  }
  return PageAggregate
}
