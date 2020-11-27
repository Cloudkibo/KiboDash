const logger = require('../../../../components/logger')
const models = require('../../../../db/models')

const TAG = '/server/api/v1/slaDashboard/teamWise/controller.js'

exports.find = function (req, res) {
  models.SDATeamWise.findAll({where: req.body})
    .then((data) => {
      return res.status(200).json({ status: 'success', payload: data })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to fetch teamWise records' })
    })
}

exports.create = function (req, res) {
  models.SDATeamWise.create(req.body)
    .then(savedData => {
      return res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      return res.status(500).json({ status: 'failed', description: 'Failed to create teamWise record' })
    })
}

exports.update = function (req, res) {
  const query = { where: req.body.query }
  const updated = req.body.updated
  models.SDATeamWise.update(updated, query)
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to update teamWise record' })
    })
}

exports.delete = function (req, res) {
  models.SDATeamWise.destroy({where: req.body})
    .then(savedData => {
      res.status(200).json({ status: 'success', payload: savedData })
    })
    .catch((err) => {
      logger.serverLog(TAG, err)
      res.status(500).json({ status: 'failed', description: 'Failed to delete teamWise record' })
    })
}
