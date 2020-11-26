const express = require('express')
const router = express.Router()

router.use('/pageWise', require('./pageWise'))

module.exports = router
