import { sequelize } from './../cron/database'
import  Sequelize  from 'sequelize'

export const UserAggregate = sequelize.define('UserAggregate', {
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
  }
});
