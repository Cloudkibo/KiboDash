require('dotenv').config()

module.exports = {
  env: process.env.URL,

  // Server port
  port: process.env.PORT || 5050,
  ip: process.env.IP || undefined
}
