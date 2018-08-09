const logger = require('./../../../components/logger')
const models = require('./../../../db/models')

const TAG = '/server/api/v1/UserwiseData/UserwiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the Userwise endpoint')
  models.UserAggregate.findAll().then((data) => {
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
