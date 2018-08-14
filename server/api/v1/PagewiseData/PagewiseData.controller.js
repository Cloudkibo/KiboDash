const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/PagewiseData/PagewiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Page Analytics endpoint')
  models.TotalPagewiseAnalytics.findAll().then((data) => {
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.OnePageAnalytics = function (req, res) {
  logger.serverLog(TAG, 'Hit the OnePageAnalytics endpoint')

  let parametersMissing = false

  if (!_.has(req.body, 'pageId')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  models.TotalPagewiseAnalytics.findAll({where: {pageId: req.body.pageId}}).then((data) => {
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

  models.PageAggregate.findAll({
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

exports.OnePageAggregateDatewise = function (req, res) {
  logger.serverLog(TAG, 'Hit the OnePageAggregateDatewise endpoint')

  let parametersMissing = false

  if (!_.has(req.body, 'startDate')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }

  models.PageAggregate.findAll({
    where: {
      createdAt: {
        [models.Sequelize.Op.gte]: req.body.startDate
      },
      pageId: req.body.pageId
    }
  })
    .then((data) => {
      res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
