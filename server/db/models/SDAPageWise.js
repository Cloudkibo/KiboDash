'use strict'

module.exports = (sequelize, DataTypes) => {
  let SDAPageWise = sequelize.define('SDAPageWise', {
    companyId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    messages: DataTypes.JSONB,
    sessions: DataTypes.JSONB,
    responses: DataTypes.INTEGER,
    avgRespTime: DataTypes.INTEGER,
    maxRespTime: DataTypes.INTEGER,
    avgResolveTime: DataTypes.INTEGER
  }, {})

  SDAPageWise.associate = function (models) {
    // associations can be defined here
  }

  return SDAPageWise
}
