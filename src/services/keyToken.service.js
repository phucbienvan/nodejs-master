'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {
    static createToken = async({userId, publicKey}) => {
        try {
            const publicKeyString = publicKey.toString()
            const token = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })
    
            return token ? token.publicKey : ''
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService
