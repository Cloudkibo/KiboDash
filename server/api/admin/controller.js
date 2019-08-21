const logger = require('./../../components/logger')
const models = require('./../../db/models')
const TAG = '/server/api/admin/.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the drop all tables endpoint')

  // models.sequelize.drop()
  models.PageAggregate.drop()
  models.TotalPagewiseAnalytics.drop()

  res.status(200).json({ status: 'success', payload: 'Droped All Tables' })
}
