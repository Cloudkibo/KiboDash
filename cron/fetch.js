// NPM Imports
const request = require('request')
const logger = require('./../server/components/logger')
const TAG = require('/cron/fetch.js')

// Model Imports
const models = require('./../server/db/models')

// App base URL
const baseURL = 'https://staging.kibopush.com/api'

// API endpoints
const getplatformdata = '/getPlatformData'
const getcompanydata = '/getCompanyData'
const getpagedata = '/getPageData'

// Following will be fetched from db
let bodyData = {
  start_date: '',
  end_date: ''
}

// Request options
let optionsPlatform = {
  method: 'POST',
  json: true,
  formData: bodyData,
  uri: baseURL + getplatformdata
}

let optionsCompany = {
  method: 'POST',
  json: true,
  formData: bodyData,
  uri: baseURL + getcompanydata
}

let optionsPage = {
  method: 'POST',
  json: true,
  formData: bodyData,
  uri: baseURL + getpagedata
}

// Requests to KiboPush server
request(optionsPlatform, (error, response, body) => {
  if (error) {
    logger.serverLog(TAG, 'Error Came from KiboPush: ' + JSON.stringify(error))
  }

  // Checking if the truthiness satisfied
  if (body) {
    let respData = {
      totalConnectedPages: body.connectedPages,
      totalPages: body.totalPages,
      totalUsers: body.totalUsers,
      totalSubscribers: body.totalSubscribers,
      totalBroadcasts: body.totalBroadcasts,
      totalPolls: body.totalPolls,
      totalSurveys: body.totalSurveys
    }

    models.PlatformAggregate.create(respData).then(savedData => { })
      .catch(error => {
        logger.serverLog(TAG, 'Error while saving to DB: ' + JSON.stringify(error))
      })
  }
})

request(optionsCompany, (error, response, body) => {
  if (error) {
    logger.serverLog(TAG, 'Error Came from KiboPush: ' + JSON.stringify(error))
  }

  // Checking if the body is truthy
  if (body) {
    let respData = {
      totalConnectedPages: body.connectedPages,
      totalPages: body.totalPages,
      totalSubscribers: body.totalSubscribers,
      totalBroadcasts: body.totalBroadcasts,
      totalPolls: body.totalPolls,
      totalSurveys: body.totalSurveys,
      companyId: body.companyId,
      companyDomain: body.companyDomain
    }

    models.UserAggregate.create(respData).then(savedData => { })
      .catch(error => {
        logger.serverLog(TAG, 'Error While saving to DB: ' + JSON.stringify(error))
      })
  }
})

request(optionsPage, (error, response, body) => {
  if (error) {
    logger.serverLog(TAG, 'Error while saving to DB: ' + JSON.stringify(error))
  }

  // Checking if the body is truthy
  if (body) {
    let respData = {
      totalSubscribers: body.Totalsubscribers,
      totalBroadcasts: body.Totalbroadcasts,
      totalPolls: body.Totalpolls,
      totalSurveys: body.Totalsurveys,
      pageId: body.pageId,
      pageName: body.pageName,
      pageLikes: body.pageLikes
    }

    models.PageAggregate.create(respData).then(savedData => { })
      .catch(error => {
        logger.serverLog(TAG, 'Error while saving to DB: ' + JSON.stringify(error))
      })
  }
})
