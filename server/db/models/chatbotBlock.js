'use strict'

module.exports = (sequelize, DataTypes) => {
  let ChatbotBlock = sequelize.define('ChatbotBlock', {
    chatbotId: DataTypes.STRING,
    title: DataTypes.STRING,
    companyId: DataTypes.STRING,
    userId: DataTypes.STRING,
    triggers: DataTypes.ARRAY(DataTypes.STRING),
    uniqueId: DataTypes.STRING,
    payload: DataTypes.ARRAY(DataTypes.JSONB),
    options: DataTypes.ARRAY(DataTypes.JSONB),
    dialogFlowIntentId: DataTypes.STRING
  }, {})

  ChatbotBlock.associate = function (models) {
    // associations can be defined here
  }

  return ChatbotBlock
}
