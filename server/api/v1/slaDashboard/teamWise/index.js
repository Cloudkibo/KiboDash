const express = require('express')
const router = express.Router()
const validate = require('express-jsonschema').validate
const auth = require('../../../../auth/auth.service')
const controller = require('./controller')
const validationSchema = require('./validationSchema')

router.post('/find',
  auth.isAuthenticated(),
  validate({ body: validationSchema.findPayload }),
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
  validate({ body: validationSchema.findPayload }),
  controller.delete)

module.exports = router
