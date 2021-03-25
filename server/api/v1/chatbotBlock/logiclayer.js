const models = require('../../../db/models')

exports.validateAndConvert = function (body) {
  let query = {...body}
  Object.keys(query).forEach((item) => {
      if (typeof query[item] === 'object' && query[item].$operator) {
          if (query[item].$operator === 'not') query[item] = { [models.Sequelize.Op.not]: query[item].$value }
      }
  })
  return query
}
