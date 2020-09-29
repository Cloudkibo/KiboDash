const { Op } = require('sequelize')

exports.mapQuery = (query) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(query)
    const specialKeys = keys.filter((k) => k.startsWith('$'))
    for (let i = 0; i < specialKeys.length; i++) {
      if (specialKeys[i] === '$contains') {
        let q = query['$contains']
        delete query['$contains']
        if (q.type === 'array') {
          query[q.field] = {
            [Op.contains]: [q.value]
          }
        } else {
          reject(`Invalid special key found ${specialKeys[i]}`)
          break
        }
      }
    }
    resolve(query)
  })
}
