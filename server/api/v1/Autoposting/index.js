const express = require('express')

const router = express.Router()

const controller = require('./Autoposting.controller')

router.get('/', controller.index)
router.post('/UserTotalAutoposting', controller.UserTotalAutoposting)
router.post('/PlatformAutopostingDatewise', controller.PlatformAutopostingDatewise)
router.post('/UserAutopostingDatewise', controller.UserAutopostingDatewise)

module.exports = router
