const models = require('../../../db/models')

exports.validateAndConvert = function (body) {
  let query = {...body}
  if (body.createdAt) query.createdAt = _convertIntoDatetime(body.createdAt)
  return query
}

const _convertIntoDatetime = (field) => {
  if (typeof field === 'string') {
    return new Date(field)
  } else if (typeof field === 'object') {
    let newField = {}
    if (field.$gt) newField = {...newField, [models.Sequelize.Op.gt]: new Date(field.$gt)}
    if (field.$gte) newField = {...newField, [models.Sequelize.Op.gte]: new Date(field.$gte)}
    if (field.$lt) newField = {...newField, [models.Sequelize.Op.lt]: new Date(field.$lt)}
    if (field.$lte) newField = {...newField, [models.Sequelize.Op.gt]: new Date(field.$gt)}
    return newField
  }
}
