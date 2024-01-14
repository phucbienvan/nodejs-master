'use strict'

const express = require('express')
const authController = require('../../controllers/auth.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const router = express.Router()

//Signup
router.post('/user/signup', asyncHandler(authController.signup))

module.exports = router
