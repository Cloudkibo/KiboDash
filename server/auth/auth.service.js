'use strict'

const config = require('../config')
const compose = require('composable-middleware')
const logger = require('../components/logger')
const TAG = 'auth/auth.service.js'

function isAuthenticated () {
  return compose().use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress

    logger.serverLog(TAG, `ip from headers: ${ip}`)
    console.log(ip)
    console.log(config.env)

    if (config.env === 'development') {
      next()
    } else {
      if (config.authorizedIps.includes(ip)) next()
      else res.send(403)
    }
  })
}

exports.isAuthenticated = isAuthenticated
