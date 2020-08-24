/**
 * Main application routes
 */

module.exports = function (app) {
  app.use('/admin', require('./api/admin'))
  app.use('/api/v1/UserwiseData', require('./api/v1/UserwiseData'))
  app.use('/api/v1/PagewiseData', require('./api/v1/PagewiseData'))
  app.use('/api/v1/PlatformwiseData', require('./api/v1/PlatformwiseData'))
  app.use('/api/v1/AutopostingData', require('./api/v1/Autoposting'))
  app.use('/api/v1/chatbotSubscribers', require('./api/v1/chatbotSubscribers'))

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })
}
