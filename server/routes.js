/**
 * Main application routes
 */

module.exports = function (app) {
  // app.use('admin', require('./api/admin'))
  app.use('/api/v1/test', require('./api/v1/test'))

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })
}
