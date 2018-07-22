//Sentry Logs

import Raven from 'raven'

Raven.config('https://6c7958e0570f455381d6f17122fbd117@sentry.io/292307', { sendTimeout: 5 }).install();

// NPM Imports
import https from 'https'
import request from 'request'

//CronHub
// ping when your job starts
https.get("https://cronhub.io/start/486be8e0-8dc6-11e8-b150-13c76fd13c42");


// Model Imports
import { PlatformAggregate as modelPlatformAggregate }  from './../migrations/PlatformAggregate'
import { UserAggregate as modelUserAggregate}  from './../migrations/UserAggregate'
import { PageAggregate as modelPageAggregate}  from './../migrations/PageAggregate'

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


// Request Callbacks
const callbackForPlatform = (error, response, body) => {
    if (error) {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
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

        modelPlatformAggregate.build(respData).save().then(savedData => {})
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

        modelUserAggregate.build(respData).save().then(savedData => {})
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
        let respData = {
            totalSubscribers: body.Totalsubscribers,
            totalBroadcasts: body.Totalbroadcasts,
            totalPolls: body.Totalpolls,
            totalSurveys: body.Totalsurveys,
            pageId: body.pageId,
            pageName: body.pageName,
            pageLikes: body.pageLikes
        }

        modelPageAggregate.build(respData).save().then(savedData => {})
            .catch(error => {
                throw error     // TODO Replace it with logic to send to error logger i.e. sentry
            })
    }
}

// Requests to KiboPush server
request(optionsPlatform, callbackForPlatform)
request(optionsCompany, callbackForCompany)
request(optionsPage, callbackForPage)

// ping when your job is finished
https.get("https://cronhub.io/finish/486be8e0-8dc6-11e8-b150-13c76fd13c42");
