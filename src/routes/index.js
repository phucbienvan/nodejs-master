'use strict'

const express = require('express')
const { apiKey } = require('../auth/checkAuth')
const router = express.Router()

// Check api key
router.use(apiKey)

router.use('/v1/api', require('./auth'))

module.exports = router
