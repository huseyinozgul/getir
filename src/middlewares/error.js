const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config');
const logger = require('../logger/logger');
const ApiError = require('../errors/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {

    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }

    const { statusCode, message, stack } = error;

    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        msg: message,
        ...(config.env === 'dev' && { stack }),
    };

    if (config.env === 'dev') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
}

module.exports = errorHandler;