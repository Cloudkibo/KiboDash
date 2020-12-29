'use strict'

module.exports = (sequelize, DataTypes) => {
  let SDAUserWise = sequelize.define('SDAUserWise', {
    companyId: DataTypes.STRING,
    pageId: DataTypes.STRING,
    userId: DataTypes.STRING,
    messages: DataTypes.JSONB,
    sessions: DataTypes.JSONB,
    responses: DataTypes.INTEGER,
    avgRespTime: DataTypes.INTEGER,
    maxRespTime: DataTypes.INTEGER,
    avgResolveTime: DataTypes.INTEGER
  }, {})

  SDAUserWise.associate = function (models) {
    // associations can be defined here
  }

  return SDAUserWise
}
