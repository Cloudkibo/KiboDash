const logger = require('./../../../components/logger')
const models = require('./../../../db/models')

const TAG = '/server/api/v1/PagewiseData/PagewiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the Pagewise endpoint')
  models.PageAggregate.findAll().then((data) => {
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
