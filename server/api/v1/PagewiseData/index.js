const express = require('express')

const router = express.Router()

const controller = require('./PagewiseData.controller')

router.get('/', controller.index)
router.post('/topPages', controller.topPages)
router.post('/OnePageAnalytics', controller.OnePageAnalytics)
router.post('/AggregateDatewise', controller.AggregateDatewise)
router.post('/OnePageAggregateDatewise', controller.OnePageAggregateDatewise)

module.exports = router
