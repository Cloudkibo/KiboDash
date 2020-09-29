const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')
const queryMapper = require('../../../db/queryMapper')

const TAG = '/server/api/v1/chatbotBlock/chatbotBlock.controller.js'

exports.find = function (req, res) {
  logger.serverLog(TAG, 'Hit the find chatbotBlock endpoint')
  queryMapper.mapQuery(req.body)
    .then(query => {
      models.ChatbotBlock.findAll({where: req.body})
        .then((data) => {
          res.status(200).json({ status: 'success', payload: data })
        })
        .catch((err) => {
          logger.serverLog(TAG, err)
          res.status(500).json({ status: 'failed', description: 'Failed to fetch chatbot block records' })
        })
    })
    .catch((err) => {
      res.status(500).json({ status: 'failed', description: err })
    })
}

exports.create = function (req, res) {
  logger.serverLog(TAG, 'Hit the create chatbotBlock endpoint')
  models.ChatbotBlock.create(req.body)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to create chatbot block record' })
    })
}

exports.update = function (req, res) {
  logger.serverLog(TAG, 'Hit the update chatbotBlock endpoint')
  const query = {where: req.body.query}
  const updated = req.body.updated
  models.ChatbotBlock.update(updated, query)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to update chatbot block record' })
    })
}

exports.delete = function (req, res) {
  logger.serverLog(TAG, 'Hit the delete chatbotBlock endpoint')
  models.ChatbotBlock.destroy({where: req.body})
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to delete chatbot block record' })
    })
}
