const express = require('express')
const router = express.Router()

router.use('/pageWise', require('./pageWise'))
router.use('/userWise', require('./userWise'))
router.use('/teamWise', require('./teamWise'))

module.exports = router
