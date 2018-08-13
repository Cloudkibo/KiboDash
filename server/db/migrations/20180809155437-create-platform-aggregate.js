'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlatformAggregates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('PlatformAggregates')
  }
}
