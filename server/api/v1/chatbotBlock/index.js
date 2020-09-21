const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate
const auth = require('../../../auth/auth.service')
const controller = require('./chatbotBlock.controller')
const validationSchema = require('./validationSchema')

router.post('/find',
  auth.isAuthenticated(),
  validate({ body: validationSchema.chatbotBlockObject }),
  controller.find)

router.post('/',
  auth.isAuthenticated(),
  validate({ body: validationSchema.createPayload }),
  controller.create)

router.put('/',
  auth.isAuthenticated(),
  validate({ body: validationSchema.updatePayload }),
  controller.update)

router.delete('/',
  auth.isAuthenticated(),
  controller.delete)

module.exports = router
