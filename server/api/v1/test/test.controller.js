const logger = require('./../../../components/logger')
const TAG = '/server/api/v1/test/test.controller.js'
exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the test endpoint')
  res.status(200).json({status: 'success', payload: 'sent successfully'})
}
