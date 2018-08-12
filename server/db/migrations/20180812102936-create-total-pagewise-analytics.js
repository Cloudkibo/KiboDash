'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TotalPagewiseAnalytics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageId: {
        type: Sequelize.STRING
      },
      pageName: {
        type: Sequelize.STRING
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TotalPagewiseAnalytics')
  }
}
