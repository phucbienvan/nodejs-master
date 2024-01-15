'use strict'

const { CREATED } = require("../core/success.response")
const AuthService = require("../services/auth.service")

class AuthController {
    signup = async(req, res, next) => {
        // console.log(await AuthService.signup(req.body))
        new CREATED({
            message: 'Register success',
            metadata: await AuthService.signup(req.body),
            options : {
                limit: 10
            }
        }).send(res)
    }
}

module.exports = new AuthController()
