// NPM Imports
const request = require('request')
const logger = require('./../server/components/logger')
const TAG = '/cron/fetch.js'

// Model Imports
const models = require('./../server/db/models')

// App base URL
// const baseURL = 'https://staging.kibopush.com/api/kibodash'
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/kibodash' : 'https://staging.kibopush.com/api/kibodash'

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
      // We are making a string because request library only supports strings for formData
      let startDate = data[0] &&
                       data[0].dataValues &&
                       data[0].dataValues.createdAt &&
                       data[0].dataValues.createdAt
      if (startDate === undefined) {
        startDate = ''
      }

      let optionsPlatform = {
        method: 'POST',
        json: true,
        formData: startDate,
        uri: baseURL + getplatformdata
      }
      reqForPlatform(optionsPlatform)
    })
    .catch((err) => {
      if (err) {
        logger.serverLog(TAG, 'Error Platform Date fetching: ' + JSON.stringify(err))
      }
    })

  // Request for Company Aggregate Data
  models.UserAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      // We are making a string because request library only supports strings for formData
      let startDate = data[0] &&
                       data[0].dataValues &&
                       data[0].dataValues.createdAt &&
                       data[0].dataValues.createdAt
      if (startDate === undefined) {
        startDate = ''
      }

      let optionsCompany = {
        method: 'POST',
        json: true,
        formData: startDate,
        uri: baseURL + getcompanydata
      }
      reqForCompany(optionsCompany)
    })
    .catch((err) => {
      if (err) {
        logger.serverLog(TAG, 'Error User Date fetching:' + JSON.stringify(err))
      }
    })

  // Request for Page Aggregate Data
  models.PageAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      // We are making a string because request library only supports strings for formData
      let startDate = data[0] &&
                       data[0].dataValues &&
                       data[0].dataValues.createdAt &&
                       data[0].dataValues.createdAt
      if (startDate === undefined) {
        startDate = ''
      }

      let optionsPage = {
        method: 'POST',
        json: true,
        formData: startDate,
        uri: baseURL + getpagedata
      }
      reqForPage(optionsPage)
    })
    .catch((err) => {
      if (err) {
        logger.serverLog(TAG, 'Error Page Date fetching:' + JSON.stringify(err))
      }
    })

  // Request for Autoposting Aggregate Data
  models.AutopostingAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
    .then((data) => {
      // We are making a string because request library only supports strings for formData
      let startDate = data[0] &&
                       data[0].dataValues &&
                       data[0].dataValues.createdAt &&
                       data[0].dataValues.createdAt
      if (startDate === undefined) {
        startDate = ''
      }

      let optionsAutoposting = {
        method: 'POST',
        json: true,
        formData: startDate,
        uri: baseURL
      }
      reqForAutoposting(optionsAutoposting)
    })
    .catch((err) => {
      if (err) {
        logger.serverLog(TAG, 'Error Autoposting Date fetching:' + JSON.stringify(err))
      }
    })
}())

const reqForPlatform = function (optionsPlatform) {
  request(optionsPlatform, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    console.log(body)
    // Checking if the truthiness satisfied
    if (body) {
      let respData = {
        totalConnectedPages: body.payload.connectedPages,
        totalPages: body.payload.totalPages,
        totalUsers: body.payload.totalUsers,
        totalSubscribers: body.payload.totalSubscribers,
        totalBroadcasts: body.payload.totalBroadcasts,
        totalPolls: body.payload.totalPolls,
        totalSurveys: body.payload.totalSurveys
      }

      console.log(respData)

      models.PlatformAggregate.create(respData).then(savedData => {
        logger.serverLog(TAG, 'Successfully Saved: ' + JSON.stringify(savedData))
      })
        .catch(error => {
          logger.serverLog(TAG, 'Error while saving platform data to DB: ' + JSON.stringify(error))
        })
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
          totalConnectedPages: body.payload[i].connectedPages,
          totalPages: body.payload[i].totalPages,
          totalSubscribers: body.payload[i].totalSubscribers,
          totalBroadcasts: body.payload[i].totalBroadcasts,
          totalPolls: body.payload[i].totalPolls,
          totalSurveys: body.payload[i].totalSurveys,
          companyId: body.payload[i].companyId,
          companyDomain: body.payload[i].companyDomain
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
          totalSubscribers: body.payload[i].Totalsubscribers,
          totalBroadcasts: body.payload[i].Totalbroadcasts,
          totalPolls: body.payload[i].Totalpolls,
          totalSurveys: body.payload[i].Totalsurveys,
          pageId: body.payload[i].pageId,
          pageName: body.payload[i].pageName,
          pageLikes: body.payload[i].pageLikes
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
            userId: body.payload[i].userId,
            autopostingId: body.payload[i].autopostingId,
            type: body.payload[i].type,
            pageId: body.payload[i].pageId,
            totalAutopostingSent: body.payload[i].totalAutopostingSent
          }
          saveToDatabase(respData, body.payload[i].type)
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
            userId: body.payload[i].userId,
            autopostingId: body.payload[i].autopostingId,
            type: body.payload[i].type,
            twitterId: body.payload[i].twitterId,
            totalAutopostingSent: body.payload[i].totalAutopostingSent
          }
          saveToDatabase(respData, body.payload[i].type)
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
            userId: body.payload[i].userId,
            autopostingId: body.payload[i].autopostingId,
            type: body.payload[i].type,
            wordpressId: body.payload[i].wordpressId,
            totalAutopostingSent: body.payload[i].totalAutopostingSent
          }
          saveToDatabase(respData, body.payload[i].type)
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
