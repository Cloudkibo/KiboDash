require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.SERVER_PORT || 5050,
  ip: process.env.IP || undefined,

  authorizedIps: [
    '::ffff:165.227.66.158', // KiboEngage production
    '::ffff:159.89.185.221', // KiboEngage staging
    '::ffff:159.203.175.244', // KiboChat production
    '::ffff:159.65.47.134' // KiboChat Staging
  ]
}
