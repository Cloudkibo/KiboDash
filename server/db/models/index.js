const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../postgreConfig/config.js`)[env]
const db = {}
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  let dbUrl = 'postgresql://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database
  sequelize = new Sequelize(dbUrl,  {

    // disable logging; default: console.log
    logging: false

  })
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    console.log('file', file)
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
