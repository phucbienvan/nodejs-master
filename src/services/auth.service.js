'use strict'

const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const JWT = require('jsonwebtoken')
const { token } = require("morgan")
const { format } = require("path")
const { getInfoData } = require("../utils")
const { BadRequestError } = require("../core/error.response")

class AuthService {
    static signup = async(params) => {
        const name = params.name
        const email = params.email
        const password = params.password
        const checkUser = await userModel.findOne({email}).lean()

        if(checkUser) {
            throw new BadRequestError('User already register')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({name, email, password:hashPassword, role: 'USER'})

        if (newUser) {
            
            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            console.log(privateKey, publicKey);

            const publicKeyString = await keyTokenService.createToken({
                userId: newUser._id,
                publicKey,
                privateKey
            })

            const accessToken = await this.generateAccessToken({userId: newUser._id, email}, publicKey, privateKey)

            return {
                code: 200,
                data: {
                    user: getInfoData({fileds: ['_id','name','email','createdAt'], object: newUser}), 
                    token: accessToken
                }
            }
        }

        return {
            code: 200,
            data: null
        }
    }

    static generateAccessToken = async (payload, publicKey, privateKey) => {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '30 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '60 days'
        })

        return {
            accessToken,
            refreshToken
        }
    }
}

module.exports = AuthService
