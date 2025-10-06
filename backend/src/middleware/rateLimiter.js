const rateLimit = require('express-rate-limit');

/**
 * Üldine rate limiter
 */
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutit
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        success: false,
        error: {
            message: 'Liiga palju päringuid, palun proovige hiljem uuesti'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Rangem limiter sisselogimise jaoks
 */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutit
    max: 5, // 5 katset
    skipSuccessfulRequests: true,
    message: {
        success: false,
        error: {
            message: 'Liiga palju sisselogimiskatseid, palun oodake 15 minutit'
        }
    }
});

/**
 * API limiter väliste päringute jaoks
 */
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minut
    max: 30,
    message: {
        success: false,
        error: {
            message: 'API limiit ületatud'
        }
    }
});

/**
 * Vorm saatmise limiter
 */
const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 tund
    max: 5,
    message: {
        success: false,
        error: {
            message: 'Liiga palju vorme saadetud, palun proovige hiljem uuesti'
        }
    }
});

module.exports = {
    generalLimiter,
    loginLimiter,
    apiLimiter,
    formLimiter
};
