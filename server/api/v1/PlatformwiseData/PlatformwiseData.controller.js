const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/PlatformwiseData/PlatformwiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Platform Analytics endpoint')
  console.log('in PlatformwiseData')
  models.TotalPlatformwiseAnalytics.findAll().then((data) => {
    console.log('data in PlatformwiseData', data)
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.AggregateDatewise = function (req, res) {
  logger.serverLog(TAG, 'Hit the AggregateDatewise endpoint')

  let parametersMissing = false

  if (!_.has(req.body, 'startDate')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  models.PlatformAggregate.findAll({
    where: {
      createdAt: {
        [models.Sequelize.Op.gte]: req.body.startDate
      }
    }
  })
    .then((data) => {
      res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
