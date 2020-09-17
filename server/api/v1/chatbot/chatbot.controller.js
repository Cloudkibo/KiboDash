const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/chatbot/chatbot.controller.js'

exports.find = function (req, res) {
  logger.serverLog(TAG, 'Hit the find chatbot endpoint')
  models.Chatbot.findAll({where: req.body})
    .then((data) => {
      res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to fetch chatbot records' })
    })
}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create chatbot endpoint')
  models.Chatbot.create(req.body)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to create chatbot record' })
    })
}

exports.update = function (req, res) {
  logger.serverLog(TAG, 'Hit the update chatbot endpoint')
  const query = { where: req.body.query }
  const updated = req.body.updated
  models.Chatbot.update(updated, query)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to update chatbot record' })
    })
}

exports.delete = function (req, res) {
  logger.serverLog(TAG, 'Hit the delete chatbot endpoint')
  models.Chatbot.destroy({where: req.body})
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to delete chatbot record' })
    })
}
