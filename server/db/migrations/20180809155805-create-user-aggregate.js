'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserAggregates', {
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
        type: Sequelize.STRING
      },
      companyDomain: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('UserAggregates')
  }
}
