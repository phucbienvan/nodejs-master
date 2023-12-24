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

// Init Database
require('./dbs/init.mongodb')
const { countConnect } = require('./helpers/check.connect')
countConnect()

module.exports = app
