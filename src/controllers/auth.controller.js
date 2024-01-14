'use strict'

const AuthService = require("../services/auth.service")

class AuthController {
    signup = async(req, res, next) => {
        return res.status(200).json(await AuthService.signup(req.body))
    }
}

module.exports = new AuthController()
