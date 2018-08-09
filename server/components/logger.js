const config = require('./../config')

exports.serverLog = function (label, data) {
  const namespace = `kibodash:${label}`
  const debug = require('debug')(namespace)

  if (config.env === 'development' || config.env === 'test') {
    debug(data)
    console.log('inside logger' + data)
    console.log(debug.enabled)
    // todo use log levels like info, warn, error and debug
    // logger.info(`${namespace} - ${data}`)
  }
}
