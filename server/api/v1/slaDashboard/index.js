const express = require('express')
const router = express.Router()

router.use('/pageWise', require('./pageWise'))
router.use('/userWise', require('./userWise'))

module.exports = router
