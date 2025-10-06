const logger = require('../config/logger');

/**
 * Keskne vigade käsitleja
 * Püüab kõik vead ja tagastab struktureeritud vastuse
 */

const errorHandler = (err, req, res, next) => {
    // Logi viga
    logger.error(`Error: ${err.message}`, {
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id
    });

    // Määra vea tüüp ja staatus
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Serveriviga';

    // Spetsiifilised vea tüübid
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Valideerimise viga';
    } else if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Autentimine ebaõnnestus';
    } else if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 409;
        message = 'Kirje juba eksisteerib';
    } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        statusCode = 400;
        message = 'Seotud kirjet ei leitud';
    } else if (err.code === 'ECONNREFUSED') {
        statusCode = 503;
        message = 'Andmebaasi ühendus ebaõnnestus';
    }

    // Tootmises peida tehniline info
    const response = {
        success: false,
        error: {
            message: message,
            ...(process.env.NODE_ENV !== 'production' && {
                details: err.message,
                stack: err.stack,
                code: err.code
            })
        }
    };

    res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route ei leitud - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

/**
 * Async handler wrapper
 * Väldib try-catch blokke kõigis route handlertes
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom error class
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Validation error handler
 */
const handleValidationError = (errors) => {
    const messages = errors.map(err => ({
        field: err.param,
        message: err.msg
    }));
    
    const error = new AppError('Valideerimise viga', 400);
    error.errors = messages;
    return error;
};

module.exports = {
    errorHandler,
    notFoundHandler,
    asyncHandler,
    AppError,
    handleValidationError
};
