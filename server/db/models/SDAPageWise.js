'use strict'

module.exports = (sequelize, DataTypes) => {
  let SDAPageWise = sequelize.define('SDAPageWise', {
    companyId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    messages: DataTypes.JSONB,
    sessions: DataTypes.JSONB,
    responses: DataTypes.INTEGER,
    avgRespTime: DataTypes.STRING,
    maxRespTime: DataTypes.STRING,
    avgResolveTime: DataTypes.STRING
  }, {})

  SDAPageWise.associate = function (models) {
    // associations can be defined here
  }

  return SDAPageWise
}
