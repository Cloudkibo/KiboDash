const logger = require('./../../../components/logger')
const models = require('./../../../db/models')
const _ = require('lodash')

const TAG = '/server/api/v1/PagewiseData/PagewiseData.controller.js'

exports.index = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Autoposting (Platform wise) Analytics endpoint')
  // Sum of all autoposting for platform
  models.AutopostingAggregate.sum('totalAutopostingSent').then((totalAutoposting) => {
    // Sum of all fb autoposting for platform
    models.AutopostingAggregate.sum('totalAutopostingSent', {where: {pageId: {[models.Sequelize.Op.ne]: null}}})
      .then((facebookAutoposting) => {
        // Sum of all twitter autoposting for platform
        models.AutopostingAggregate.sum('totalAutopostingSent', {where: {twitterId: {[models.Sequelize.Op.ne]: null}}})
          .then((twitterAutoposting) => {
            // Sum of all wordpress autoposting for platform
            models.AutopostingAggregate.sum('totalAutopostingSent', {where: {wordpressId: {[models.Sequelize.Op.ne]: null}}})
              .then((wordpressAutoposting) => {
                let payload = {
                  totalAutoposting: totalAutoposting,
                  facebookAutoposting: facebookAutoposting,
                  twitterAutoposting: twitterAutoposting,
                  wordpressAutoposting: wordpressAutoposting
                }
                res.status(200).json({ status: 'success', payload: payload })
              })
          })
      })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.UserTotalAutoposting = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Autoposting (User wise) Analytics endpoint')

  let parametersMissing = false

  if (!_.has(req.body, 'companyId')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }
  let userCondition = {where: {userId: req.body.companyId}}
  let fbCondition = {where: {type: 'facebook', userId: req.body.companyId}}
  let twitterCondition = {where: {type: 'twitter', userId: req.body.companyId}}
  let wordPressCondition = {where: {type: 'wordpress', userId: req.body.companyId}}

  models.AutopostingAggregate.sum('totalAutopostingSent', userCondition).then((totalUserwise) => {
    models.AutopostingAggregate.sum('totalAutopostingSent', fbCondition).then((fbUserwise) => {
      models.AutopostingAggregate.sum('totalAutopostingSent', twitterCondition).then((twitterUserwise) => {
        models.AutopostingAggregate.sum('totalAutopostingSent', wordPressCondition).then((wordpressUserwise) => {
          let payload = {
            companyId: req.body.companyId,
            totalAutoposting: totalUserwise,
            facebookAutoposting: fbUserwise,
            twitterAutoposting: twitterUserwise,
            wordpressAutoposting: wordpressUserwise
          }
          res.status(200).json({ status: 'success', payload: payload })
        })
      })
    })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.PlatformAutopostingDatewise = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Autoposting Platform (Date wise) Analytics endpoint')
  let parametersMissing = false

  if (!_.has(req.body, 'startDate')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }
  let userCondition = {where: {createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}}}
  let fbCondition = {where: {type: 'facebook', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}}}
  let twitterCondition = {where: {type: 'twitter', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}}}
  let wordPressCondition = {where: {type: 'wordpress', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}}}

  models.AutopostingAggregate.sum('totalAutopostingSent', userCondition).then((totalUserwise) => {
    models.AutopostingAggregate.sum('totalAutopostingSent', fbCondition).then((fbUserwise) => {
      models.AutopostingAggregate.sum('totalAutopostingSent', twitterCondition).then((twitterUserwise) => {
        models.AutopostingAggregate.sum('totalAutopostingSent', wordPressCondition).then((wordpressUserwise) => {
          let payload = {
            startDate: req.body.startDate,
            totalAutoposting: totalUserwise,
            facebookAutoposting: fbUserwise,
            twitterAutoposting: twitterUserwise,
            wordpressAutoposting: wordpressUserwise
          }
          res.status(200).json({ status: 'success', payload: payload })
        })
      })
    })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}

exports.UserAutopostingDatewise = function (req, res) {
  logger.serverLog(TAG, 'Hit the All Autoposting User (Date wise) Analytics endpoint')
  let parametersMissing = false

  if (!_.has(req.body, 'companyId')) parametersMissing = true
  if (!_.has(req.body, 'startDate')) parametersMissing = true

  if (parametersMissing) {
    return res.status(400)
      .json({status: 'failed', description: 'Parameters are missing'})
  }
  let userCondition = {where: {createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}, userId: req.body.companyId}}
  let fbCondition = {where: {type: 'facebook', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}, userId: req.body.companyId}}
  let twitterCondition = {where: {type: 'twitter', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}, userId: req.body.companyId}}
  let wordPressCondition = {where: {type: 'wordpress', createdAt: {[models.Sequelize.Op.gte]: req.body.startDate}, userId: req.body.companyId}}

  models.AutopostingAggregate.sum('totalAutopostingSent', userCondition).then((totalUserwise) => {
    models.AutopostingAggregate.sum('totalAutopostingSent', fbCondition).then((fbUserwise) => {
      models.AutopostingAggregate.sum('totalAutopostingSent', twitterCondition).then((twitterUserwise) => {
        models.AutopostingAggregate.sum('totalAutopostingSent', wordPressCondition).then((wordpressUserwise) => {
          let payload = {
            startDate: req.body.startDate,
            totalAutoposting: totalUserwise,
            facebookAutoposting: fbUserwise,
            twitterAutoposting: twitterUserwise,
            wordpressAutoposting: wordpressUserwise
          }
          res.status(200).json({ status: 'success', payload: payload })
        })
      })
    })
  })
    .catch((err) => {
      res.status(500).json({ status: 'failed', payload: err })
    })
}
