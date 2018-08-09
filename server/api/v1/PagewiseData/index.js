const express = require('express')

const router = express.Router()

const controller = require('./PagewiseData.controller')

router.get('/', controller.index)

module.exports = router
