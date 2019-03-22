require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.SERVER_PORT || 5050,
  ip: process.env.IP || undefined
}
