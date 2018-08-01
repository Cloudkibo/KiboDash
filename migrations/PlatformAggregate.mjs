import { sequelize } from './../cron/database'
import  Sequelize  from 'sequelize'

export const PlatformAggregate = sequelize.define('PlatformAggregate', {
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
  totalUsers: {
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
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
})
