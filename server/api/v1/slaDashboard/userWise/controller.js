const logger = require('../../../../components/logger')
const models = require('../../../../db/models')
const { validateAndConvert } = require('../logiclayer')
const TAG = '/server/api/v1/slaDashboard/userWise/controller.js'

exports.find = function (req, res) {
  const query = validateAndConvert(req.body)
  models.SDAUserWise.findAll({where: query})
    .then((data) => {
      return res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to fetch userWise records' })
    })
}

exports.create = function (req, res) {
  models.SDAUserWise.create(req.body)
    .then(savedData => {
      return res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to create userWise record' })
    })
}

exports.update = function (req, res) {
  const query = { where: req.body.query }
  const updated = req.body.updated
  models.SDAUserWise.update(updated, query)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to update userWise record' })
    })
}

exports.delete = function (req, res) {
  models.SDAUserWise.destroy({where: req.body})
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to delete userWise record' })
    })
}
