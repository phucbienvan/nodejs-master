'use strict'

const StatusCode = {
    OK : 200,
    CREATED : 201,
}

const ReasonStatusCode = {
    OK : 'Success',
    CREATED : 'Created',
}


class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatus = ReasonStatusCode.OK, metadata = {}}) {
        this.message = !message ? reasonStatus : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor ({message, metadata}) {
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor ({message, statusCode = StatusCode.CREATED, reasonStatus = ReasonStatusCode.CREATED, metadata, options = {}}) {
        super({message, statusCode, reasonStatus, metadata})
        this.options = options
    }
}

module.exports = { OK, CREATED }
