require('dotenv').config()

module.exports = {
  'development': {
    'username': process.env.DEV_USERNAME,
    'password': process.env.DEV_PASSWORD,
    'database': process.env.DEV_DATABASE,
    'host': process.env.DEV_HOST,
    'port': process.env.DEV_PORT,
    'dialect': 'mysql',
    'pool': {
      'max': 30,
      'min': 0,
      'idle': 20000,
      'acquire': 20000
    }
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': process.env.PROD_USERNAME,
    'password': process.env.PROD_PASSWORD,
    'database': process.env.PROD_DATABASE,
    'host': process.env.PROD_HOST,
    'port': process.env.PROD_PORT,
    'dialect': 'mysql'
  },
  'cron': {
    'username': 'kibo',
    'password': 'kibo4321',
    'database': 'kibo',
    'host': '127.0.0.1',
    'port': '5432',
    'dialect': 'mysql'
  }
}
