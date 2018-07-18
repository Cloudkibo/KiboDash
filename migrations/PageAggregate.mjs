import { sequelize } from './../cron/database'
import  Sequelize  from 'sequelize'

export const PageAggregate = sequelize.define('PageAggregate', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pageId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pageName: {
    type: Sequelize.STRING,
  },
  pageLikes: {
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
