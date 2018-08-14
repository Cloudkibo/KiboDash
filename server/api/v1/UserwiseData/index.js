const express = require('express')

const router = express.Router()

const controller = require('./UserwiseData.controller')

router.get('/', controller.index)
router.post('/OneUserAnalytics', controller.OneUserAnalytics)
router.post('/AggregateDatewise', controller.AggregateDatewise)
 router.post('/OneUserAggregateDatewise', controller.OneUserAggregateDatewise)
module.exports = router
