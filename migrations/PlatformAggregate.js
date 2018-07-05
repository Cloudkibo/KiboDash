import { sequelize } from './../cron/database'

export const PlatformAggregate = sequelize.define('PlatformAggregate', {
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
  }
});
