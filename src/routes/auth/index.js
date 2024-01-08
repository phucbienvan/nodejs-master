'use strict'

const express = require('express')
const authController = require('../../controllers/auth.controller')
const router = express.Router()

//Signup
router.post('/user/signup', authController.signup)

module.exports = router
