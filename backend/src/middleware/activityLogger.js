const logger = require('../config/logger');
const { query } = require('../config/database');

/**
 * Activity Logger Middleware
 * Logib kõik olulised tegevused andmebaasi ja failidesse
 */

const activityLogger = async (req, res, next) => {
    // Salvesta algne res.json funktsioon
    const originalJson = res.json.bind(res);

    // Override res.json et püüda vastust
    res.json = function (body) {
        // Logi tegevus ainult edukate päringute puhul
        if (res.statusCode >= 200 && res.statusCode < 400) {
            logActivity(req, res, body).catch(err => {
                logger.error('Activity logging failed:', err);
            });
        }
        return originalJson(body);
    };

    next();
};

const logActivity = async (req, res, body) => {
    try {
        // Määra tegevuse tüüp
        const action = determineAction(req);
        
        // Ignoreeri teatud route'id (nt. health checks)
        if (shouldSkipLogging(req.path)) {
            return;
        }

        // Logi konsooli ja faili
        const logMessage = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - User: ${req.user?.username || 'Anonymous'} - IP: ${req.ip}`;
        logger.info(logMessage);

        // Logi andmebaasi ainult olulised tegevused
        if (shouldLogToDatabase(action)) {
            await query(
                `INSERT INTO activity_logs 
                (user_id, action_type, table_name, description, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    req.user?.id || null,
                    action,
                    extractTableName(req.path),
                    `${req.method} ${req.originalUrl}`,
                    req.ip || req.connection.remoteAddress,
                    req.get('user-agent') || 'Unknown'
                ]
            );
        }

        // Logi e-maili saatmised eraldi tabelisse
        if (action === 'EMAIL_SENT' && body.emailSent) {
            await query(
                `INSERT INTO email_logs 
                (recipient_email, subject, email_type, status, sent_at) 
                VALUES (?, ?, ?, ?, NOW())`,
                [
                    body.recipient || 'unknown',
                    body.subject || 'No subject',
                    body.emailType || 'general',
                    'sent'
                ]
            );
        }

    } catch (error) {
        logger.error('Activity log error:', error);
    }
};

// Määra tegevuse tüüp URL ja meetodi põhjal
const determineAction = (req) => {
    const { method, path } = req;
    
    if (path.includes('/login')) return 'USER_LOGIN';
    if (path.includes('/logout')) return 'USER_LOGOUT';
    if (path.includes('/booking') && method === 'POST') return 'BOOKING_CREATE';
    if (path.includes('/booking') && method === 'PUT') return 'BOOKING_UPDATE';
    if (path.includes('/booking') && method === 'DELETE') return 'BOOKING_DELETE';
    if (path.includes('/sparepart') && method === 'POST') return 'INQUIRY_CREATE';
    if (path.includes('/sparepart') && method === 'PUT') return 'INQUIRY_UPDATE';
    if (path.includes('/admin/services') && method === 'POST') return 'SERVICE_CREATE';
    if (path.includes('/admin/services') && method === 'PUT') return 'SERVICE_UPDATE';
    if (path.includes('/admin/services') && method === 'DELETE') return 'SERVICE_DELETE';
    if (path.includes('/admin/gallery') && method === 'POST') return 'GALLERY_CREATE';
    if (path.includes('/admin/gallery') && method === 'DELETE') return 'GALLERY_DELETE';
    
    return `${method}_REQUEST`;
};

// Välista teatud route'd logimisest
const shouldSkipLogging = (path) => {
    const skipPaths = ['/health', '/favicon.ico', '/metrics'];
    return skipPaths.some(skip => path.includes(skip));
};

// Määra, kas logida andmebaasi
const shouldLogToDatabase = (action) => {
    const importantActions = [
        'USER_LOGIN',
        'USER_LOGOUT',
        'BOOKING_CREATE',
        'BOOKING_UPDATE',
        'BOOKING_DELETE',
        'INQUIRY_CREATE',
        'SERVICE_CREATE',
        'SERVICE_UPDATE',
        'SERVICE_DELETE',
        'GALLERY_CREATE',
        'GALLERY_DELETE'
    ];
    return importantActions.includes(action);
};

// Eralda tabeli nimi URL'ist
const extractTableName = (path) => {
    if (path.includes('/booking')) return 'bookings';
    if (path.includes('/sparepart')) return 'sparepart_inquiries';
    if (path.includes('/service')) return 'services';
    if (path.includes('/gallery')) return 'gallery_images';
    if (path.includes('/contact')) return 'contact_messages';
    return null;
};

// Ekspordi ka eraldi logimisfunktsioon
const logManualActivity = async (userId, actionType, tableName, description, ip = null) => {
    try {
        await query(
            `INSERT INTO activity_logs 
            (user_id, action_type, table_name, description, ip_address) 
            VALUES (?, ?, ?, ?, ?)`,
            [userId, actionType, tableName, description, ip]
        );
        logger.info(`Manual activity logged: ${actionType} - ${description}`);
    } catch (error) {
        logger.error('Manual activity log error:', error);
    }
};

module.exports = {
    activityLogger,
    logManualActivity
};
