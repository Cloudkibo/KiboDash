'use strict'
module.exports = (sequelize, DataTypes) => {
  let AutopostingAggregate = sequelize.define('AutopostingAggregate', {
    userId: DataTypes.STRING,
    autopostingId: DataTypes.STRING,
    type: DataTypes.STRING,
    pageId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    wordpressId: DataTypes.STRING,
    totalAutopostingSent: DataTypes.INTEGER
  }, {})
  AutopostingAggregate.associate = function (models) {
    // associations can be defined here
  }
  return AutopostingAggregate
}
