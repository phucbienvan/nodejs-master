const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config();
const app = express()

// Init middleware
app.use(morgan("short"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// Init Database
require('./dbs/init.mongodb')
const router = require('./routes')
app.use('/', router)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error , req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        code: statusCode,
        message: error.message || 'Server error'
    })
})

module.exports = app
