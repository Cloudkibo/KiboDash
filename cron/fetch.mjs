// NPM Imports
const request = require('request')

// Model Imports
const modelPlatformAggregate = require('./../migrations/PlatformAggregate')
const modelUserAggregate = require('./../migrations/UserAggregate')
const modelPageAggregate = require('./../migrations/PageAggregate')

// App base URL
const baseURL = 'https://app.kibopush.com/api'

// API endpoints
const getplatformdata = '/getPlatformData'
const getcompanydata = '/getCompanyData'
const getpagedata = '/getPageData'

// Post request body    TODO ask about fetching from db
let bodyData = {
    start_date: '',     // populate by fetching from db
    end_date: ''        // populate by fetching from db
}

// Request options
let optionsPlatform = {
    method: 'POST',
    json: true,
    formData: bodyData,
    uri: baseURL+getplatformdata
}

let optionsCompany= {
    method: 'POST',
    json: true,
    formData: bodyData,
    uri: baseURL+getcompanydata
}

let optionsPage = {
    method: 'POST',
    json: true,
    formData: bodyData,
    uri: baseURL+getpagedata
}

// Requests to KiboPush server
request(optionsPlatform, callbackForPlatform(error, response, body))
request(optionsCompany, callbackForCompany(error, response, body))
request(optionsPage, callbackForPage(error, response, body))



// Request Callbacks
const callbackForPlatform = (error, response, body) => {
    if (error) {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
    }

    // Checking if the truthiness satisfied
    if (body) {
        // TODO confirm the response body from dayem
        let respData = {
            totalConnectedPages: body.Connectedpages,
            totalPages: body.Totalpages,
            totalUsers: body.Totalusers,
            totalSubscribers: body.Totalsubscribers,
            totalBroadcasts: body.Totalbroadcasts,
            totalPolls: body.Totalpolls,
            totalSurveys: body.Totalsurveys
        }

        modelPlatformAggregate.build(respData).save.then(savedData => {})
            .catch(error => {
                throw error     // TODO Replace it with logic to send to error logger i.e. sentry
            })
    }
}

const callbackForCompany = (error, response, body) => {
    if (error) {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
    }

    // Checking if the body is truthy
    if (body) {
        // TODO confirm the response body from dayem
        let respData = {
            totalConnectedPages: body.Connectedpages,
            totalPages: body.Totalpages,
            totalSubscribers: body.Totalsubscribers,
            totalBroadcasts: body.Totalbroadcasts,
            totalPolls: body.Totalpolls,
            totalSurveys: body.Totalsurveys
        }

        modelUserAggregate.build(respData).save.then(savedData => {})
            .catch(error => {
                throw error     // TODO Replace it with logic to send to error logger i.e. sentry
            })
    }
}

const callbackForPage = (error, response, body) => {
    if (error) {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
    }

    // Checking if the body is truthy
    if (body) {
        // TODO confirm the response body from dayem
        let respData = {
            totalSubscribers: body.Totalsubscribers,
            totalBroadcasts: body.Totalbroadcasts,
            totalPolls: body.Totalpolls,
            totalSurveys: body.Totalsurveys
        }

        modelPageAggregate.build(respData).save.then(savedData => {})
            .catch(error => {
                throw error     // TODO Replace it with logic to send to error logger i.e. sentry
            })
    }
}