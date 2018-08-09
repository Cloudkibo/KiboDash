// process.env.NODE_ENV = process.env.NODE_ENV || 'development' // production

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const methodOverride = require('method-override')
const compression = require('compression')
const helmet = require('helmet')

const config = require('./config')
const logger = require('./components/logger')
const models = require('./db/models')
const TAG = 'app.js'

const app = express()
const env = app.get('env')

/**
   * middleware to compress response body to optimize app
   * (it is better done on nginx proxy level)
   */

app.use(compression())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride())

if (env === 'production') {
  /**
   * Helmet can help protect your app from some
   * well-known web vulnerabilities by setting
   * HTTP headers appropriately.
   */
  app.use(helmet())
}
if (env === 'development' || env === 'test') {
  /**
   * HTTP request logger
   */

  app.use(morgan('dev'))
}

/**
 * sync function will check if the tables exist
 *    then don't run
 * else
 *    run and create the tables
 */
models.sequelize.sync().then(() => {
  // Start the express server
  app.listen(config.port, () => {
    logger.serverLog(TAG, `KiboPush server STARTED on ${
      config.port} in ${config.env} mode`)
  })
})

if (config.env === 'production') {
  logger.serverLog('KiboPush server STARTED on %s in %s mode', config.port, config.env)
}

require('./routes')(app)
