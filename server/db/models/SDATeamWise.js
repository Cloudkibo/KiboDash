'use strict'

module.exports = (sequelize, DataTypes) => {
  let SDATeamWise = sequelize.define('SDATeamWise', {
    companyId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    teamId: DataTypes.STRING,
    messages: DataTypes.JSONB,
    sessions: DataTypes.JSONB,
    responses: DataTypes.INTEGER,
    avgRespTime: DataTypes.INTEGER,
    maxRespTime: DataTypes.INTEGER,
    avgResolveTime: DataTypes.INTEGER
  }, {})

  SDATeamWise.associate = function (models) {
    // associations can be defined here
  }

  return SDATeamWise
}
