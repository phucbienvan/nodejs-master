'use strict'
const mongodb = require('mongoose')

const countConnect = () => {
    const count = mongodb.connect.length
    console.log(`Count connect db ${count}`);
}

module.exports = {
    countConnect
}
