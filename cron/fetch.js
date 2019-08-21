// NPM Imports
const request = require('request')
const util = require('util')
const logger = require('./../server/components/logger')
const TAG = '/cron/fetch.js'

// Model Imports
logger.serverLog(TAG, 'after models')
const models = require('./../server/db/models')
// App base URL
// const baseURL = 'https://staging.kibopush.com/api/kibodash'
const baseURL = process.env.URL === 'production' ? 'https://accounts.cloudkibo.com/api/kibodash' : 'http://localhost:3024/api/kibodash'

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
  // models.PlatformAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
  //   .then((data) => {
  //     // We are making a string because request library only supports strings for formData
  //     let startDate = data[0] &&
  //                      data[0].dataValues &&
  //                      data[0].dataValues.createdAt &&
  //                      data[0].dataValues.createdAt
  //     if (startDate === undefined) {
  //       startDate = ''
  //     }
  //
  //     let optionsPlatform = {
  //       form: {startDate: startDate},
  //       url: baseURL + getplatformdata
  //     }
  //     // reqForPlatform(optionsPlatform)
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       logger.serverLog(TAG, 'Error Platform Date fetching: ' + JSON.stringify(err))
  //     }
  //   })
  //
  // // Request for Company Aggregate Data
  // models.UserAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
  //   .then((data) => {
  //     // We are making a string because request library only supports strings for formData
  //     let startDate = data[0] &&
  //                      data[0].dataValues &&
  //                      data[0].dataValues.createdAt &&
  //                      data[0].dataValues.createdAt
  //     if (startDate === undefined) {
  //       startDate = ''
  //     }
  //
  //     let optionsCompany = {
  //       form: {startDate: startDate},
  //       url: baseURL + getcompanydata
  //     }
  //     // reqForCompany(optionsCompany)
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       logger.serverLog(TAG, 'Error User Date fetching:' + JSON.stringify(err))
  //     }
  //   })

  // Request for Page Aggregate Data
  models.PagesUpdated.findAll({})
    .then((data) => {
      // We are making a string because request library only supports strings for formData
      // let startDate = data[0] &&
      //                  data[0].dataValues &&
      //                  data[0].dataValues.updatedAt &&
      //                  data[0].dataValues.updatedAt
      // if (startDate === undefined) {
      //   startDate = ''
      // }
      let startDate = ''
      let optionsPage = {
        form: {startDate: startDate},
        url: baseURL + getpagedata
      }
      reqForPage(optionsPage)
    })
    .catch((err) => {
      if (err) {
        logger.serverLog(TAG, 'Error Page Date fetching:' + JSON.stringify(err))
      }
    })

  // Request for Autoposting Aggregate Data
  // models.AutopostingAggregate.findAll({order: [['createdAt', 'DESC']], limit: 1})
  //   .then((data) => {
  //     // We are making a string because request library only supports strings for formData
  //     let startDate = data[0] &&
  //                      data[0].dataValues &&
  //                      data[0].dataValues.createdAt &&
  //                      data[0].dataValues.createdAt
  //     if (startDate === undefined) {
  //       startDate = ''
  //     }
  //     let optionsAutoposting = {
  //       form: {
  //         startDate: startDate
  //       },
  //       url: baseURL
  //     }
  //     // reqForAutoposting(optionsAutoposting)
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       logger.serverLog(TAG, 'Error Autoposting Date fetching:' + JSON.stringify(err))
  //     }
  //   })
}())

const reqForPlatform = function (optionsPlatform) {
  logger.serverLog(TAG, 'Inside req for Platform: ')
  request.post(optionsPlatform, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    logger.serverLog(TAG, 'Inside req for Platform: ' + util.inspect(body))
    // Checking if the truthiness satisfied
    if (body && body.payload) {
      let respData = {
        totalConnectedPages: body.payload.connectedPages,
        totalPages: body.payload.totalPages,
        totalUsers: body.payload.totalUsers,
        totalSubscribers: body.payload.totalSubscribers,
        totalBroadcasts: body.payload.totalBroadcasts,
        totalPolls: body.payload.totalPolls,
        totalSurveys: body.payload.totalSurveys
      }

      models.PlatformAggregate.create(respData).then(savedData => {
        logger.serverLog(TAG, 'Successfully Saved: Platform Aggregate')
        // Going to update total Platform Analytics table
        models.TotalPlatformwiseAnalytics.find().then(result => {
          if (result) {
            let updatePayload = {
              totalConnectedPages: body.payload.connectedPages,
              totalPages: body.payload.totalPages,
              totalUsers: result.dataValues.totalUsers + body.payload.totalUsers,
              totalSubscribers: result.dataValues.totalSubscribers + body.payload.totalSubscribers,
              totalBroadcasts: result.dataValues.totalBroadcasts + body.payload.totalBroadcasts,
              totalPolls: result.dataValues.totalPolls + body.payload.totalPolls,
              totalSurveys: result.dataValues.totalSurveys + body.payload.totalSurveys
            }
            result.updateAttributes(updatePayload).then(result2 => {
              logger.serverLog(TAG, 'Successfully update Total Platformwise Analytics: ')
            })
              .catch(error => {
                logger.serverLog(TAG, 'Error While update user wise analytics: ' + JSON.stringify(error))
              })
          } else {
            // It means this is the first entry for platform wise analytics
            models.TotalPlatformwiseAnalytics.create(respData).then(analyticsResult => {
              logger.serverLog(TAG, 'Successfully saved Total Platformwise Analytics: ')
            })
          }
        })
      })
        .catch(error => {
          logger.serverLog(TAG, 'Error while saving platform data to DB: ' + JSON.stringify(error))
        })
    }
  })
}

const reqForCompany = function (optionsCompany) {
  logger.serverLog(TAG, 'Inside req for Company: ')
  request.post(optionsCompany, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    logger.serverLog(TAG, 'Inside req for Company: ' + util.inspect(body))
    // Checking if the body is truthy
    if (body && body.payload) {
      logger.serverLog(TAG, 'Inside company if body: ' + util.inspect(body))
      let respData, updatePayload, analyticsPayload
      for (let i = 0, length = body.payload.length; i < length; i++) {
        respData = {
          totalConnectedPages: body.payload[i].numberOfConnectedPages,
          totalPages: body.payload[i].numberOfPages,
          totalSubscribers: body.payload[i].numberOfSubscribers,
          totalBroadcasts: body.payload[i].numberOfBroadcasts,
          totalPolls: body.payload[i].numberOfPolls,
          totalSurveys: body.payload[i].numberOfSurveys,
          companyId: body.payload[i].companyId,
          companyDomain: body.payload[i].userId
        }


      logger.serverLog(TAG, 'Inside company loop: ' + util.inspect(respData))

        models.UserAggregate.create(respData).then(savedData => {
          console.log('UserAggregate create', savedData)
          logger.serverLog(TAG, 'Successfully Saved: UserAggregate')
          // Going to update total Platform Analytics table
          models.TotalUserwiseAnalytics.findOne({where: {companyId: body.payload[i].companyId}}).then(result => {
            if (result) {
              updatePayload = {
                totalConnectedPages: body.payload[i].numberOfConnectedPages,
                totalPages: body.payload[i].numberOfPages,
                totalSubscribers: result.dataValues.totalSubscribers + body.payload[i].numberOfSubscribers,
                totalBroadcasts: result.dataValues.totalBroadcasts + body.payload[i].numberOfBroadcasts,
                totalPolls: result.dataValues.totalPolls + body.payload[i].numberOfPolls,
                totalSurveys: result.dataValues.totalSurveys + body.payload[i].numberOfSurveys
              }
              result.updateAttributes(updatePayload).then(result2 => {
                logger.serverLog(TAG, 'Successfully update Total Userwise Analytics: ')
              })
            } else {
              // This means that this is the first entry for Total Userwise Analytics
              analyticsPayload = {
                companyId: body.payload[i].companyId,
                companyDomain: body.payload[i].userId,
                totalConnectedPages: body.payload[i].numberOfConnectedPages,
                totalPages: body.payload[i].numberOfPages,
                totalSubscribers: body.payload[i].numberOfSubscribers,
                totalBroadcasts: body.payload[i].numberOfBroadcasts,
                totalPolls: body.payload[i].numberOfPolls,
                totalSurveys: body.payload[i].numberOfSurveys
              }
              models.TotalUserwiseAnalytics.create(analyticsPayload).then(analyticsResult => {
                console.log('Successfully Saved to user wise analytics', analyticsResult)
                logger.serverLog(TAG, 'Successfully Saved to user wise analytics : ')
              })
            }
          })
            .catch(error => {
              logger.serverLog(TAG, 'Error While update user wise analytics: ' + JSON.stringify(error))
            })
        })
          .catch(error => {
            logger.serverLog(TAG, 'Error While saving company data to DB: ' + JSON.stringify(error))
          })
      }
    }
  })
}

const reqForPage = function (optionsPage) {
  logger.serverLog(TAG, 'Inside req for Page: ')
  request.post(optionsPage, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    // Checking if the body is truthy
    if (body && body.payload && body.payload.length > 0) {
      let respData, updatePayload, analyticsPayload
      models.PagesUpdated.findOne({}).then(result => {
        if (result) {
          updatePayload = {
            updateId: result.dataValues.updateId + 1
          }
          result.updateAttributes(updatePayload).then(result2 => {
            logger.serverLog(TAG, 'Successfully updated PagesUpdatedTable ')
          })
        } else {
          updatedPayload = {
            updateId: 1
          }
          models.PagesUpdated.create(updatedPayload).then(pagesUpdatedResult => {
            logger.serverLog(TAG, 'Successfully Saved to page wise analytics : ')
          })
        }
      })
      logger.serverLog(TAG, 'Inside req for Page in if ')
      for (let i = 0, length = body.payload.length; i < length; i++) {
        respData = {
          totalSubscribers: body.payload[i].numberOfSubscribers,
          totalBroadcasts: body.payload[i].numberOfBroadcasts,
          totalPolls: body.payload[i].numberOfPolls,
          totalSurveys: body.payload[i].numberOfSurveys,
          pageId: body.payload[i].pageId,
          pageName: body.payload[i].pageName,
          pageLikes: body.payload[i].likes
        }
        // console.log('body.payload[i]', body.payload[i])
        // models.PageAggregate.create(respData).then(savedData => {
        //   console.log('saved PageAggregate')
        //   logger.serverLog(TAG, 'Successfully Saved: Page Aggregate')
          // Going to update total Platform Analytics table
          models.TotalPageAnalytics.findOne({where: {page_id: body.payload[i]._id}}).then(result => {
            console.log('result', result.dataValues)
            if (result) {
              updatePayload = {
                totalSubscribers: result.dataValues.totalSubscribers + body.payload[i].numberOfSubscribers,
                totalBroadcasts: result.dataValues.totalBroadcasts + body.payload[i].numberOfBroadcasts,
                totalPolls: result.dataValues.totalPolls + body.payload[i].numberOfPolls,
                totalSurveys: result.dataValues.totalSurveys + body.payload[i].numberOfSurveys,
                pageLikes: 1 // result.dataValues.pageLikes + body.payload[i].pageLikes
              }
              result.updateAttributes(updatePayload).then(result2 => {
                logger.serverLog(TAG, 'Successfully update Total Pagewise Analytics: ')
              })
            } else {
              // This means that this is the first entry for Total Userwise Analytics
              analyticsPayload = {
                totalSubscribers: body.payload[i].numberOfSubscribers,
                totalBroadcasts: body.payload[i].numberOfBroadcasts,
                totalPolls: body.payload[i].numberOfPolls,
                totalSurveys: body.payload[i].numberOfSurveys,
                pageId: body.payload[i].pageId,
                pageName: body.payload[i].pageName,
                pageLikes: 1,
                page_id: body.payload[i]._id
              }
              models.TotalPageAnalytics.create(analyticsPayload).then(analyticsResult => {
                logger.serverLog(TAG, 'Successfully Saved to page wise analytics : ')
              })
            }
          })
            .catch(error => {
              console.log('error while updating pageanalytics', error)
              logger.serverLog(TAG, 'Error While update page wise analytics: ' + JSON.stringify(error))
            })
        // })
        //   .catch(error => {
        //     console.log('error at page sabving', error)
        //     logger.serverLog(TAG, 'Error while saving page data to DB: ' + JSON.stringify(error))
        //   })
      }
    }
  })
}

const reqForAutoposting = function (optionsAutoposting) {
  console.log('Inside req for Autoposting')
  logger.serverLog(TAG, 'Inside req for Autoposting')
  // Below code will request for autoposting for facebook autoposting
  getFacebookAutoposting(optionsAutoposting)
  getTwitterAutoposting(optionsAutoposting)
  getWordpressAutoposting(optionsAutoposting)
  // (function () {
  //   optionsAutoposting.url = baseURL + getfacebookauto
  //   logger.serverLog(TAG, 'Options: ' + JSON.stringify(optionsAutoposting))
  //   request.post(optionsAutoposting, (error, response, body) => {
  //     if (error) {
  //       logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
  //     }
  //     body = JSON.parse(body)
  //     logger.serverLog(TAG, 'Inside req for Autoposting Facebook: ' + util.inspect(body))
  //     logger.serverLog(TAG, `response data:  ${body}`)
  //     console.log('from accounts', body)
  //     if (body && body.payload) {
  //       let respData
  //       for (let i = 0, length = body.payload.length; i < length; i++) {
  //         respData = {
  //           userId: body.payload[i].userId,
  //           autopostingId: body.payload[i]._id,
  //           type: body.payload[i].subscriptionType,
  //           pageId: body.payload[i].subscriptionUrl,
  //           totalAutopostingSent: body.payload[i].totalAutopostingSent
  //         }
  //         saveToDatabase(respData, body.payload[i].subscriptionType)
  //       }
  //     }
  //   })
  // }());
  //
  // // Below code will request for autoposting for twitter autoposting
  // (function () {
  //   console.log('below code')
  //   optionsAutoposting.url = baseURL + gettwitterauto
  //   request.post(optionsAutoposting, (error, response, body) => {
  //     if (error) {
  //       logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
  //     }
  //     body = JSON.parse(body)
  //     logger.serverLog(TAG, 'Inside req for Autoposting Twitter: ' + util.inspect(body))
  //     console.log('in twitter', body)
  //     if (body && body.payload) {
  //       logger.serverLog(TAG, `Autoposting data ${JSON.stringify(body)}`)
  //       let respData
  //       for (let i = 0, length = body.payload.length; i < length; i++) {
  //         respData = {
  //           userId: body.payload[i].userId,
  //           autopostingId: body.payload[i]._id,
  //           type: body.payload[i].subscriptionType,
  //           twitterId: body.payload[i].subscriptionUrl,
  //           totalAutopostingSent: body.payload[i].totalAutopostingSent
  //         }
  //         saveToDatabase(respData, body.payload[i].subscriptionType)
  //       }
  //     }
  //   })
  // }());
  //
  // // Below code will request for autoposting for wordpress autoposting
  // (function () {
  //   optionsAutoposting.url = baseURL + getwordpressauto
  //   request.post(optionsAutoposting, (error, response, body) => {
  //     if (error) {
  //       logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
  //     }
  //     body = JSON.parse(body)
  //     logger.serverLog(TAG, 'Inside req for Autoposting Wordpress: ' + util.inspect(body))
  //     if (body && body.payload) {
  //       let respData
  //       for (let i = 0, length = body.length; i < length; i++) {
  //         respData = {
  //           userId: body.payload[i].userId,
  //           autopostingId: body.payload[i]._id,
  //           type: body.payload[i].subscriptionType,
  //           wordpressId: body.payload[i].subscriptionUrl,
  //           totalAutopostingSent: body.payload[i].totalAutopostingSent
  //         }
  //         saveToDatabase(respData, body.payload[i].subscriptionType)
  //       }
  //     }
  //   })
  // }())
}

const getFacebookAutoposting = function (optionsAutoposting) {
  console.log('in Facebook')
  optionsAutoposting.url = baseURL + getfacebookauto
  logger.serverLog(TAG, 'Options: ' + JSON.stringify(optionsAutoposting))
  request.post(optionsAutoposting, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    logger.serverLog(TAG, 'Inside req for Autoposting Facebook: ' + util.inspect(body))
    logger.serverLog(TAG, `response data:  ${body}`)
    if (body && body.payload) {
      let respData
      for (let i = 0, length = body.payload.length; i < length; i++) {
        respData = {
          userId: body.payload[i].userId,
          autopostingId: body.payload[i]._id,
          type: body.payload[i].subscriptionType,
          pageId: body.payload[i].subscriptionUrl,
          totalAutopostingSent: body.payload[i].totalAutopostingSent
        }
        saveToDatabase(respData, body.payload[i].subscriptionType)
      }
    }
  })
}
const getTwitterAutoposting = function (optionsAutoposting) {
  console.log('in twitter')
  optionsAutoposting.url = baseURL + gettwitterauto
  request.post(optionsAutoposting, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    logger.serverLog(TAG, 'Inside req for Autoposting Twitter: ' + util.inspect(body))
    if (body && body.payload) {
      logger.serverLog(TAG, `Autoposting data ${JSON.stringify(body)}`)
      let respData
      for (let i = 0, length = body.payload.length; i < length; i++) {
        respData = {
          userId: body.payload[i].userId,
          autopostingId: body.payload[i]._id,
          type: body.payload[i].subscriptionType,
          twitterId: body.payload[i].subscriptionUrl,
          totalAutopostingSent: body.payload[i].totalAutopostingSent
        }
        saveToDatabase(respData, body.payload[i].subscriptionType)
      }
    }
  })
}
const getWordpressAutoposting = function (optionsAutoposting) {
  console.log('in wordpress')
  optionsAutoposting.url = baseURL + getwordpressauto
  request.post(optionsAutoposting, (error, response, body) => {
    if (error) {
      logger.serverLog(TAG, 'Error while fetching from KiboPush: ' + JSON.stringify(error))
    }
    body = JSON.parse(body)
    console.log('wordpress payload', body)
    logger.serverLog(TAG, 'Inside req for Autoposting Wordpress: ' + util.inspect(body))
    if (body && body.payload) {
      let respData
      for (let i = 0, length = body.payload.length; i < length; i++) {
        respData = {
          userId: body.payload[i].userId,
          autopostingId: body.payload[i]._id,
          type: body.payload[i].subscriptionType,
          wordpressId: body.payload[i].subscriptionUrl,
          totalAutopostingSent: body.payload[i].totalAutopostingSent
        }
        console.log('in going to saveToDatabase')
        saveToDatabase(respData, body.payload[i].subscriptionType)
      }
    }
  })
}

const saveToDatabase = function (respData, type) {
  models.AutopostingAggregate.create(respData).then(savedData => {
    logger.serverLog(TAG, 'Successfully Saved: Autoposting Aggregate')
  })
    .catch(error => {
      logger.serverLog(TAG, 'Error while saving autoposting' + type + 'to DB: ' + JSON.stringify(error))
    })
}
