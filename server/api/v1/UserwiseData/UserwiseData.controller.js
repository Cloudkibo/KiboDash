const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/UserwiseData/UserwiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the All User Analytics endpoint')
  models.UserAggregate.findAll().then((data) => {
    console.log('in UserAggregate', data)
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
  models.TotalUserwiseAnalytics.findAll().then((data) => {
    console.log('in TotalUserwiseAnalytics', data)
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.OneUserAnalytics = function (req, res) {
  logger.serverLog(TAG, 'Hit the OneUserAnalytics endpoint')

  let parametersMissing = false
  if (!_.has(req.body, 'companyId')) parametersMissing = true
  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  models.TotalUserwiseAnalytics.findAll({where: {companyId: req.body.companyId}}).then((data) => {
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({status: 'failed', payload: err})
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

  models.UserAggregate.findAll({
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

exports.OneUserAggregateDatewise = function (req, res) {
  logger.serverLog(TAG, 'Hit the OneUserAggregateDatewise endpoint')

  let parametersMissing = false
  if (!_.has(req.body, 'startDate')) parametersMissing = true
  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  models.UserAggregate.findAll({
    where: {
      createdAt: {
        [models.Sequelize.Op.gte]: req.body.startDate
      },
      companyId: req.body.companyId
    }
  })
    .then((data) => {
      res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
