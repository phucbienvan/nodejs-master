'use strict'

const { API_KEY } = process.env
const HEADER = {
    API_KEY : 'b-api-key',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()

        if (!key || key != API_KEY) {
            res.status(403).json({
                message: 'Forbidden error'
            })
        }

        return next()
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = { apiKey, asyncHandler }
