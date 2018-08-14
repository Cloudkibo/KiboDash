const express = require('express')

const router = express.Router()

const controller = require('./PlatformwiseData.controller')

router.get('/', controller.index)
router.post('/AggregateDatewise', controller.AggregateDatewise)

module.exports = router
