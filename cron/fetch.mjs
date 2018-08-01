// NPM Imports
// const request = require('request')
import request from 'request'

// Model Importss
import { PlatformAggregate } from '../migrations/PlatformAggregate.mjs'
import { UserAggregate } from '../migrations/UserAggregate.mjs'
import { PageAggregate } from '../migrations/PageAggregate.mjs'

// App base URL
const baseURL = 'http://localhost:3000/api/kibodash'

// API endpoints
const getplatformdata = '/getPlatformData'
const getcompanydata = '/getCompanyData'
const getpagedata = '/getPageData'

// Post request body    TODO ask about fetching from db
let bodyData = {
  startDate: ''    // populate by fetching from db
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

// Request Callbacks
// const callbackForPlatform = (error, response, body) => {
//   if (error) {
//     throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//   }

//   // Checking if the truthiness satisfied
//   if (body) {
//     let respData = {
//       totalConnectedPages: body.connectedPages,
//       totalPages: body.totalPages,
//       totalUsers: body.totalUsers,
//       totalSubscribers: body.totalSubscribers,
//       totalBroadcasts: body.totalBroadcasts,
//       totalPolls: body.totalPolls,
//       totalSurveys: body.totalSurveys
//     }

//     PlatformAggregate.build(respData).save.then(savedData => { })
//       .catch(error => {
//         throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//       })
//   }
// }

// const callbackForCompany = (error, response, body) => {
//   if (error) {
//     throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//   }

//   // Checking if the body is truthy
//   if (body) {
//     console.log('body-resp' + JSON.stringify(body))
//     let respData = {
//       totalConnectedPages: body.connectedPages,
//       totalPages: body.totalPages,
//       totalSubscribers: body.totalSubscribers,
//       totalBroadcasts: body.totalBroadcasts,
//       totalPolls: body.totalPolls,
//       totalSurveys: body.totalSurveys,
//       companyId: body.companyId,
//       companyDomain: body.companyDomain
//     }

//     UserAggregate.build(respData).save().then(savedData => { })
//       .catch(error => {
//         throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//       })
//   }
// }

// const callbackForPage = (error, response, body) => {
//   if (error) {
//     throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//   }

//   // Checking if the body is truthy
//   if (body) {
//     console.log('resp-page' + JSON.stringify(body))
//     let respData = {
//       // totalSubscribers: body.Totalsubscribers,
//       // totalBroadcasts: body.Totalbroadcasts,
//       // totalPolls: body.Totalpolls,
//       // totalSurveys: body.Totalsurveys,
//       // pageId: body.pageId,
//       // pageName: body.pageName,
//       // pageLikes: body.pageLikes
//     }

//     PageAggregate.build(respData).save().then(savedData => { })
//       .catch(error => {
//         throw error     // TODO Replace it with logic to send to error logger i.e. sentry
//       })
//   }
// }

// Requests to KiboPush server
// call for Platform data
request(optionsPlatform, (error, response, body) => {
  if (error) {
    throw error     // TODO Replace it with logic to send to error logger i.e. sentry
  }

  // Checking if the truthiness satisfied
  if (body.status === 'success') {
    let payload = body.payload
    let respData = {
      totalConnectedPages: payload.connectedPages,
      totalPages: payload.totalPages,
      totalUsers: payload.totalUsers,
      totalSubscribers: payload.totalSubscribers,
      totalBroadcasts: payload.totalBroadcasts,
      totalPolls: payload.totalPolls,
      totalSurveys: payload.totalSurveys
    }

    PlatformAggregate.build(respData).save().then(savedData => {
    })
      .catch(error => {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
      })
  }
})
// call for PageAggregate data
request(optionsPage, (error, response, body) => {
  let pageAggregateResults = []
  if (error) {
    throw error     // TODO Replace it with logic to send to error logger i.e. sentry
  }

  // Checking if the body is truthy
  if (body.status === 'success') {
    let pageResults = body.payload
    pageResults.map((page) => {
      let pageAggregate = {}
      pageAggregate.pageId = page._id
      pageAggregate.pageName = page.pageName
      pageAggregate.pageLikes = page.likes
      pageAggregate.totalSubscribers = page.numberOfSubscribers
      pageAggregate.totalBroadcasts = page.numberOfBroadcasts
      pageAggregate.totalPolls = page.numberOfPolls
      pageAggregate.totalSurveys = page.numberOfSurveys

      pageAggregateResults.push(pageAggregate)
    })
    // save bulk data
    PageAggregate.bulkCreate(pageAggregateResults, { returning: true }).then(savedData => {
    })
      .catch(error => {
        throw error     // TODO Replace it with logic to send to error logger i.e. sentry
      })
  }
})
// call for company wise data
request(optionsCompany, (error, response, body) => {
  let companyAggregateResults = []
  if (error) {
    throw error     // TODO Replace it with logic to send to error logger i.e. sentry
  }

  // Checking if the body is truthy
  if (body) {
    let companyResults = body.payload
    companyResults.map((company) => {
      let companyAggregate = {}

      companyAggregate.totalConnectedPages = company.numberOfConnectedPages
      companyAggregate.totalPages = company.numberOfPages
      companyAggregate.totalSubscribers = company.numberOfSubscribers
      companyAggregate.totalBroadcasts = company.numberOfBroadcasts
      companyAggregate.totalPolls = company.numberOfPolls
      companyAggregate.totalSurveys = company.numberOfSurveys
      companyAggregate.companyId = company.companyId
      companyAggregate.userId = company.userId
      companyAggregate.userName = company.userName
      companyAggregateResults.push(companyAggregate)

      UserAggregate.bulkCreate(companyAggregateResults).then(savedData => {
      })
        .catch(error => {
          throw error     // TODO Replace it with logic to send to error logger i.e. sentry
        })
    })
  }
})
