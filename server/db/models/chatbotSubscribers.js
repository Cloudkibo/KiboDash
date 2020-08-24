'use strict'
module.exports = (sequelize, DataTypes) => {
  let ChatbotSubscribersAnalytics = sequelize.define('ChatbotSubscribersAnalytics', {
    chatbotId: DataTypes.STRING,
    companyId: DataTypes.STRING,
    subscriberId: DataTypes.STRING,
    subscriberName: DataTypes.STRING,
    time: DateTypes.STRING,
    messageBlockId: DataTypes.STRING,
    messageBlockTitle: DataTypes.STRING,
    blocksPath: DateTypes.STRING
  }, {})
  ChatbotSubscribersAnalytics.associate = function (models) {
    // associations can be defined here
  }
  return ChatbotSubscribersAnalytics
}
