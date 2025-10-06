const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { AppError } = require('./errorHandler');

/**
 * JWT autentimise middleware
 */
const authenticate = async (req, res, next) => {
    try {
        // Võta token headerist
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Autentimine nõutav', 401);
        }

        const token = authHeader.split(' ')[1];

        // Kontrolli tokenit
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Otsi kasutaja andmebaasist
        const users = await query(
            'SELECT id, username, email, role, is_active FROM users WHERE id = ?',
            [decoded.id]
        );

        if (!users || users.length === 0) {
            throw new AppError('Kasutajat ei leitud', 401);
        }

        const user = users[0];

        if (!user.is_active) {
            throw new AppError('Kasutaja on deaktiveeritud', 403);
        }

        // Lisa kasutaja req objektile
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AppError('Vigane token', 401));
        } else if (error.name === 'TokenExpiredError') {
            next(new AppError('Token on aegunud', 401));
        } else {
            next(error);
        }
    }
};

/**
 * Rollipõhine autoriseerimine
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError('Autentimine nõutav', 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError('Puuduvad õigused', 403));
        }

        next();
    };
};

/**
 * Valikuline autentimine
 * Lisab kasutaja kui token on olemas, aga ei nõua
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const users = await query(
                'SELECT id, username, email, role, is_active FROM users WHERE id = ?',
                [decoded.id]
            );

            if (users && users.length > 0 && users[0].is_active) {
                req.user = users[0];
            }
        }
    } catch (error) {
        // Ignoreeri vigu, kuna auth on valikuline
    }
    
    next();
};

/**
 * API võtme kontrollimine (tuleviku jaoks)
 */
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return next(new AppError('Vigane API võti', 403));
    }
    
    next();
};

module.exports = {
    authenticate,
    authorize,
    optionalAuth,
    checkApiKey
};
