'use strict'

module.exports = (sequelize, DataTypes) => {
  let SDATeamWise = sequelize.define('SDATeamWise', {
    companyId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    teamId: DataTypes.STRING,
    messages: DataTypes.JSONB,
    sessions: DataTypes.JSONB,
    avgRespTime: DataTypes.STRING,
    maxRespTime: DataTypes.STRING,
    avgResolveTime: DataTypes.STRING
  }, {})

  SDATeamWise.associate = function (models) {
    // associations can be defined here
  }

  return SDATeamWise
}
