// NPM Imports
const request = require('request')
const logger = require('./../server/components/logger')
const TAG = '/cron/fetch.js'

// Model Imports
const models = require('./../server/db/models')

// App base URL
const baseURL = 'https://staging.kibopush.com/api'

// API endpoints
const getplatformdata = '/getPlatformData'
const getcompanydata = '/getCompanyData'
const getpagedata = '/getPageData'
const getfacebookauto = '/getFacebookAutoposting'
const gettwitterauto = '/getTwitterAutoposting'
const getwordpressauto = '/getWordpressAutoposting'; // Don't remove this semicolan. Other wise the IIFE will fail

// Going to use IIFE pattern to initialize the cron script (Entry point to main functionality)
(function () {
  // Request for Platform Aggregate data
  models.PlatformAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      let bodyData = {
        start_date: data[0].dataValues.createdAt
      }
      let optionsPlatform = {
        method: 'POST',
        json: true,
        formData: bodyData,
        uri: baseURL + getplatformdata
      }
      reqForPlatform(optionsPlatform)
    })

  // Request for Company Aggregate Data
  models.UserAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      let bodyData = {
        start_date: data[0].dataValues.createdAt
      }
      let optionsCompany = {
        method: 'POST',
        json: true,
        formData: bodyData,
        uri: baseURL + getcompanydata
      }
      reqForCompany(optionsCompany)
    })

  // Request for Page Aggregate Data
  models.PageAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      let bodyData = {
        start_date: data[0].dataValues.createdAt
      }
      let optionsPage = {
        method: 'POST',
        json: true,
        formData: bodyData,
        uri: baseURL + getpagedata
      }
      reqForPage(optionsPage)
    })

  // Request for Autoposting Aggregate Data
  models.AutopostingAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      let bodyData = {
        start_date: data[0].dataValues.createdAt
      }
      let optionsAutoposting = {
        method: 'POST',
        json: true,
        formData: bodyData,
        uri: baseURL
      }
      reqForAutoposting(optionsAutoposting)
    })
}())

const reqForPlatform = function (optionsPlatform) {
  request(optionsPlatform, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }

    // Checking if the truthiness satisfied
    if (body) {
      let respData
      for (let i = 0, length = body.length; i < length; i++) {
        respData = {
          totalConnectedPages: body[i].connectedPages,
          totalPages: body[i].totalPages,
          totalUsers: body[i].totalUsers,
          totalSubscribers: body[i].totalSubscribers,
          totalBroadcasts: body[i].totalBroadcasts,
          totalPolls: body[i].totalPolls,
          totalSurveys: body[i].totalSurveys
        }

        models.PlatformAggregate.create(respData).then(savedData => {
          logger.serverLog(TAG, 'Successfully Saved: ' + JSON.stringify(savedData))
        })
          .catch(error => {
            logger.serverLog(TAG, 'Error while saving platform data to DB: ' + JSON.stringify(error))
          })
      }
    }
  })
}

const reqForCompany = function (optionsCompany) {
  request(optionsCompany, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }

    // Checking if the body is truthy
    if (body) {
      let respData
      for (let i = 0, length = body.length; i < length; i++) {
        respData = {
          totalConnectedPages: body[i].connectedPages,
          totalPages: body[i].totalPages,
          totalSubscribers: body[i].totalSubscribers,
          totalBroadcasts: body[i].totalBroadcasts,
          totalPolls: body[i].totalPolls,
          totalSurveys: body[i].totalSurveys,
          companyId: body[i].companyId,
          companyDomain: body[i].companyDomain
        }

        models.UserAggregate.create(respData).then(savedData => {
          logger.serverLog(TAG, 'Successfully Saved: ' + JSON.stringify(savedData))
        })
          .catch(error => {
            logger.serverLog(TAG, 'Error While saving company data to DB: ' + JSON.stringify(error))
          })
      }
    }
  })
}

const reqForPage = function (optionsPage) {
  request(optionsPage, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }

    // Checking if the body is truthy
    if (body) {
      let respData
      for (let i = 0, length = body.length; i < length; i++) {
        respData = {
          totalSubscribers: body[i].Totalsubscribers,
          totalBroadcasts: body[i].Totalbroadcasts,
          totalPolls: body[i].Totalpolls,
          totalSurveys: body[i].Totalsurveys,
          pageId: body[i].pageId,
          pageName: body[i].pageName,
          pageLikes: body[i].pageLikes
        }

        models.PageAggregate.create(respData).then(savedData => {
          logger.serverLog(TAG, 'Successfully Saved: ' + JSON.stringify(savedData))
        })
          .catch(error => {
            logger.serverLog(TAG, 'Error while saving page data to DB: ' + JSON.stringify(error))
          })
      }
    }
  })
}

const reqForAutoposting = function (optionsAutoposting) {
  // Below code will request for autoposting for facebook autoposting
  (function () {
    optionsAutoposting.uri = baseURL + getfacebookauto
    request(optionsAutoposting, (error, response, body) => {
      if (error) {
        logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
      }

      if (body) {
        let respData
        for (let i = 0, length = body.length; i < length; i++) {
          respData = {
            userId: body[i].userId,
            autopostingId: body[i].autopostingId,
            type: body[i].type,
            pageId: body[i].pageId,
            totalAutopostingSent: body[i].totalAutopostingSent
          }
          saveToDatabase(respData, body[i].type)
        }
      }
    })
  }());

  // Below code will request for autoposting for twitter autoposting
  (function () {
    optionsAutoposting.uri = baseURL + gettwitterauto
    request(optionsAutoposting, (error, response, body) => {
      if (error) {
        logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
      }

      if (body) {
        let respData
        for (let i = 0, length = body.length; i < length; i++) {
          respData = {
            userId: body[i].userId,
            autopostingId: body[i].autopostingId,
            type: body[i].type,
            twitterId: body[i].twitterId,
            totalAutopostingSent: body[i].totalAutopostingSent
          }
          saveToDatabase(respData, body[i].type)
        }
      }
    })
  }());

  // Below code will request for autoposting for wordpress autoposting
  (function () {
    optionsAutoposting.uri = baseURL + getwordpressauto
    request(optionsAutoposting, (error, response, body) => {
      if (error) {
        logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
      }

      if (body) {
        let respData
        for (let i = 0, length = body.length; i < length; i++) {
          respData = {
            userId: body[i].userId,
            autopostingId: body[i].autopostingId,
            type: body[i].type,
            wordpressId: body[i].wordpressId,
            totalAutopostingSent: body[i].totalAutopostingSent
          }
          saveToDatabase(respData, body[i].type)
        }
      }
    })
  }())
}

const saveToDatabase = function (respData, type) {
  models.AutopostingAggregate.create(respData).then(savedData => {
    logger.serverLog(TAG, 'Successfully Saved: ' + JSON.stringify(savedData))
  })
    .catch(error => {
      logger.serverLog(TAG, 'Error while saving autoposting' + type + 'to DB: ' + JSON.stringify(error))
    })
}
