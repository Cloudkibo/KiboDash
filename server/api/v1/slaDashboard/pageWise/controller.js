const logger = require('../../../../components/logger')
const models = require('../../../../db/models')
const { validateAndConvert } = require('../logiclayer')
const TAG = '/server/api/v1/slaDashboard/pageWise/controller.js'

exports.find = function (req, res) {
  const query = validateAndConvert(req.body)
  models.SDAPageWise.findAll({where: query})
    .then((data) => {
      return res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to fetch pageWise records' })
    })
}

exports.create = function (req, res) {
  models.SDAPageWise.create(req.body)
    .then(savedData => {
      return res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to create pageWise record' })
    })
}

exports.update = function (req, res) {
  const query = { where: req.body.query }
  const updated = req.body.updated
  models.SDAPageWise.update(updated, query)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to update pageWise record' })
    })
}

exports.delete = function (req, res) {
  models.SDAPageWise.destroy({where: req.body})
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to delete pageWise record' })
    })
}
