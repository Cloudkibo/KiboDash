import { sequelize } from './../cron/database'
import  Sequelize  from 'sequelize'

export const PageAggregate = sequelize.define('PageAggregate', {
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
