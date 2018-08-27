const express = require('express')

const router = express.Router()

const controller = require('./controller')

router.get('/drop', controller.index)

module.exports = router
