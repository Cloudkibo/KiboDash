import { sequelize } from './../cron/database'
import  Sequelize  from 'sequelize'

export const UserAggregate = sequelize.define('UserAggregate', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  totalConnectedPages: {
    type: Sequelize.INTEGER
  },
  totalPages: {
    type: Sequelize.INTEGER
  },
  totalSubscribers: {
    type: Sequelize.INTEGER
  },
  totalBroadcasts: {
    type: Sequelize.INTEGER
  },
  totalPolls: {
    type: Sequelize.INTEGER
  },
  totalSurveys: {
    type: Sequelize.INTEGER
  },
  companyId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  useName: {
    type: Sequelize.STRING
  }
})
