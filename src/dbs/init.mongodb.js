'use strict'

const mongoose  = require("mongoose")
const { DATABASE_MONGODB } = process.env

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(DATABASE_MONGODB).then(_ => console.log('Connect mongodb successfully'))
        .catch(err => console.log('error connect db'))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
