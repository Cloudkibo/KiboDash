'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TotalAutopostingAnalytics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      },
      autopostingId: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      pageId: {
        type: Sequelize.STRING
      },
      twitterId: {
        type: Sequelize.STRING
      },
      wordpressId: {
        type: Sequelize.STRING
      },
      totalAutopostingSent: {
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
    return queryInterface.dropTable('TotalAutopostingAnalytics')
  }
}
