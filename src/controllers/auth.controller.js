'use strict'

const AuthService = require("../services/auth.service")

class AuthController {
    signup = async(req, res, next) => {
        try {
            return res.status(200).json(await AuthService.signup(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
