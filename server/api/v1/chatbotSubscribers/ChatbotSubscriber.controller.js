const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/ChatbotSubscriber/ChatbotSubscriber.controller.js'

exports.find = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Page Analytics endpoint')
  models.ChatbotSubscribersAnalytics.findAll({where: req.body, limit: 10}).then((data) => {
    res.status(200).json({ status: 'success', payload: data })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Page Analytics endpoint')
  models.ChatbotSubscribersAnalytics.create(req.body).then(savedData => {
    res.status(200).json({ status: 'success', payload: savedData })
  })
  .catch((err) => {
    res.status(500).json({ status: 'failed', payload: err })
  })
}
