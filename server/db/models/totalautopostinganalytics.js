'use strict'
module.exports = (sequelize, DataTypes) => {
  let TotalAutopostingAnalytics = sequelize.define('TotalAutopostingAnalytics', {
    userId: DataTypes.STRING,
    autopostingId: DataTypes.STRING,
    type: DataTypes.STRING,
    pageId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    wordpressId: DataTypes.STRING,
    totalAutopostingSent: DataTypes.INTEGER
  }, {})
  TotalAutopostingAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return TotalAutopostingAnalytics
}
