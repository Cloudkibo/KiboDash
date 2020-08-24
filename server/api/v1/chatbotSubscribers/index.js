const express = require('express')

const router = express.Router()

const controller = require('./ChatbotSubscriber.controller')

router.post('/find', controller.find)
router.post('/create', controller.create)

module.exports = router
