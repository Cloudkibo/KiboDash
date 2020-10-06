'use strict'

module.exports = (sequelize, DataTypes) => {
  let Chatbot = sequelize.define('Chatbot', {
    chatbotId: DataTypes.STRING,
    platform: DataTypes.STRING,
    title: DataTypes.STRING,
    companyId: DataTypes.STRING,
    userId: DataTypes.STRING,
    startingBlockId: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {})

  Chatbot.associate = function (models) {
    // associations can be defined here
  }
  return Chatbot
}
