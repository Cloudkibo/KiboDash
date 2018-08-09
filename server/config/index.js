module.exports = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 3000,
  ip: process.env.IP || undefined,
  DB_MYSQL: 'mysql://root:kibo4321@localhost:3306/kibodash',
  MONGO_URL: 'mongodb://localhost:27017',
  MONGO_DB: 'kibodash'
}
