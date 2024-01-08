'use strict'

const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const JWT = require('jsonwebtoken')
const { token } = require("morgan")
const { format } = require("path")
const { getInfoData } = require("../utils")

class AuthService {
    static signup = async(params) => {
        try {
            const name = params.name
            const email = params.email
            const password = params.password
            const checkUser = await userModel.findOne({email}).lean()

            if(checkUser) {
                return {
                    message: 'email already exist'
                }
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = await userModel.create({name, email, password:hashPassword, role: 'USER'})

            if (newUser) {
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })

                const publicKeyString = await keyTokenService.createToken({
                    userId: newUser._id,
                    publicKey
                })

                console.log(privateKey, publicKey);

                if (!publicKeyString) {
                    return {
                        message: 'publicKeyString error'
                    }
                }

                const accessToken = await this.generateAccessToken({userId: newUser._id, email}, publicKeyString, privateKey)

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
        } catch(error) {
            console.log(error);
            return {
                message: 'error'
            }
        }
    }

    static generateAccessToken = async (payload, publicKey, privateKey) => {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '30 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '60 days'
        })

        return {
            accessToken,
            refreshToken
        }
    }
}

module.exports = AuthService
