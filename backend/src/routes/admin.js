const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const { asyncHandler, handleValidationError, AppError } = require('../middleware/errorHandler');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const SparePartInquiry = require('../models/SparePartInquiry');
const logger = require('../config/logger');

/**
 * @route   POST /api/admin/login
 * @desc    Admin sisselogimine
 * @access  Public (rate limited)
 */
router.post('/login',
    loginLimiter,
    [
        body('username').trim().notEmpty().withMessage('Kasutajanimi on kohustuslik'),
        body('password').notEmpty().withMessage('Parool on kohustuslik'),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw handleValidationError(errors.array());
        }

        const { username, password } = req.body;

        // Leia kasutaja
        const users = await query(
            'SELECT * FROM users WHERE username = ? AND is_active = true',
            [username]
        );

        if (!users || users.length === 0) {
            throw new AppError('Vale kasutajanimi või parool', 401);
        }

        const user = users[0];

        // Kontrolli parooli
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new AppError('Vale kasutajanimi või parool', 401);
        }

        // Uuenda viimast sisselogimist
        await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

        // Genereeri JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        logger.info(`User logged in: ${username}`);

        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    })
);

/**
 * @route   GET /api/admin/dashboard
 * @desc    Hangi dashboard statistika
 * @access  Private/Admin
 */
router.get('/dashboard', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    // Hangi statistika
    const bookingStats = await Booking.getStatistics();
    const inquiryStats = await SparePartInquiry.getStatistics();
    const serviceStats = await Service.getStatistics();
    const todayBookings = await Booking.getTodayBookings();

    res.json({
        success: true,
        data: {
            bookings: bookingStats,
            inquiries: inquiryStats,
            services: serviceStats,
            todayBookings
        }
    });
}));

/**
 * @route   GET /api/admin/broneeringud
 * @desc    Hangi kõik broneeringud (admin)
 * @access  Private/Admin
 */
router.get('/broneeringud', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const filters = {
        status: req.query.status,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        service_id: req.query.service_id,
        limit: req.query.limit || 100,
        offset: req.query.offset || 0
    };

    const bookings = await Booking.findAll(filters);

    res.json({
        success: true,
        data: bookings,
        count: bookings.length
    });
}));

/**
 * @route   PUT /api/admin/broneeringud/:id
 * @desc    Uuenda broneeringut
 * @access  Private/Admin
 */
router.put('/broneeringud/:id', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const booking = await Booking.update(req.params.id, req.body);

    res.json({
        success: true,
        data: booking,
        message: 'Broneering uuendatud'
    });
}));

/**
 * @route   DELETE /api/admin/broneeringud/:id
 * @desc    Kustuta broneering
 * @access  Private/Admin
 */
router.delete('/broneeringud/:id', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    await Booking.delete(req.params.id);

    res.json({
        success: true,
        message: 'Broneering kustutatud'
    });
}));

/**
 * @route   GET /api/admin/paringud
 * @desc    Hangi kõik varuosapäringud
 * @access  Private/Admin
 */
router.get('/paringud', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const filters = {
        status_id: req.query.status_id,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        car_make: req.query.car_make,
        limit: req.query.limit || 100,
        offset: req.query.offset || 0
    };

    const inquiries = await SparePartInquiry.findAll(filters);

    res.json({
        success: true,
        data: inquiries,
        count: inquiries.length
    });
}));

/**
 * @route   PUT /api/admin/paringud/:id
 * @desc    Uuenda päringu staatust
 * @access  Private/Admin
 */
router.put('/paringud/:id', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const { status_id, admin_notes } = req.body;
    const inquiry = await SparePartInquiry.updateStatus(req.params.id, status_id, admin_notes);

    res.json({
        success: true,
        data: inquiry,
        message: 'Päring uuendatud'
    });
}));

/**
 * @route   DELETE /api/admin/paringud/:id
 * @desc    Kustuta varuosapäring
 * @access  Private/Admin
 */
router.delete('/paringud/:id', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    await SparePartInquiry.delete(req.params.id);

    res.json({
        success: true,
        message: 'Päring kustutatud'
    });
}));

/**
 * @route   POST /api/admin/teenused
 * @desc    Loo uus teenus
 * @access  Private/Admin
 */
router.post('/teenused', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        data: service,
        message: 'Teenus loodud'
    });
}));

/**
 * @route   PUT /api/admin/teenused/:id
 * @desc    Uuenda teenust
 * @access  Private/Admin
 */
router.put('/teenused/:id', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    const service = await Service.update(req.params.id, req.body);

    res.json({
        success: true,
        data: service,
        message: 'Teenus uuendatud'
    });
}));

/**
 * @route   DELETE /api/admin/teenused/:id
 * @desc    Kustuta teenus
 * @access  Private/Admin
 */
router.delete('/teenused/:id', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    await Service.delete(req.params.id);

    res.json({
        success: true,
        message: 'Teenus kustutatud'
    });
}));

/**
 * @route   POST /api/admin/paringud/:id/vastus
 * @desc    Saada vastus varuosapäringule
 * @access  Private/Admin
 */
router.post('/paringud/:id/vastus', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const { price, availability, delivery_time, additional_info } = req.body;
    const inquiryId = req.params.id;

    // Hangi päringu andmed
    const inquiry = await SparePartInquiry.findById(inquiryId);
    if (!inquiry) {
        return res.status(404).json({
            success: false,
            message: 'Päringut ei leitud'
        });
    }

    // Uuenda päringu staatust ja märgi vastus saadetud
    await SparePartInquiry.updateStatus(inquiryId, 3); // 3 = Pakkumine saadetud
    await SparePartInquiry.markResponseSent(inquiryId);
    
    // Lisa response_date
    await query(
        'UPDATE sparepart_inquiries SET response_date = NOW() WHERE id = ?',
        [inquiryId]
    );

    // Salvesta vastuse detailid
    await query(
        `INSERT INTO sparepart_responses (inquiry_id, price, availability, delivery_time, additional_info, created_by)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [inquiryId, price, availability, delivery_time, additional_info, req.user.id]
    );

    // Saada email kliendile (integreeri emaili teenusega)
    // TODO: Implement email sending
    const emailBody = `
Tere ${inquiry.client_name}!

Täname Teid pöördumise eest BMA Motors varuosade osas.

Teie päringu detailid:
- Auto: ${inquiry.car_make} ${inquiry.car_model} (${inquiry.car_year})
- Varuosa: ${inquiry.sparepart_name}

Meie pakkumine:
- Hind: ${price} €
- Saadavus: ${availability === 'in_stock' ? 'Laos' : availability === 'order_needed' ? 'Tellimisel' : 'Ei ole saadaval'}
- Tarneaeg: ${delivery_time}

${additional_info ? `Lisainfo: ${additional_info}` : ''}

Kui soovite tellimust esitada, palun võtke meiega ühendust.

Lugupidamisega,
BMA Motors meeskond
    `.trim();

    logger.info(`Response sent for inquiry ${inquiryId} by user ${req.user.username}`);

    res.json({
        success: true,
        message: 'Vastus edukalt saadetud',
        data: {
            inquiry_id: inquiryId,
            email_sent: true // Muuda false kui email tegelikult ei saadetud
        }
    });
}));

/**
 * @route   GET /api/admin/logs
 * @desc    Hangi tegevuste logid
 * @access  Private/Admin
 */
router.get('/logs', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    const { limit = 100, offset = 0 } = req.query;

    const logs = await query(
        `SELECT l.*, u.username 
         FROM activity_logs l
         LEFT JOIN users u ON l.user_id = u.id
         ORDER BY l.created_at DESC
         LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)]
    );

    res.json({
        success: true,
        data: logs,
        count: logs.length
    });
}));

/**
 * @route   GET /api/admin/sonumid
 * @desc    Hangi kõik kontakti sõnumid
 * @access  Private/Admin
 */
router.get('/sonumid', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const { is_read, limit = 100, offset = 0 } = req.query;

    let sql = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];

    if (is_read !== undefined) {
        sql += ' AND is_read = ?';
        params.push(is_read === 'true' ? 1 : 0);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const messages = await query(sql, params);

    // Hangi ka statistikat
    const stats = await query(`
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread,
            SUM(CASE WHEN replied = 1 THEN 1 ELSE 0 END) as replied
        FROM contact_messages
    `);

    res.json({
        success: true,
        data: messages,
        count: messages.length,
        stats: stats[0]
    });
}));

/**
 * @route   GET /api/admin/sonumid/:id
 * @desc    Hangi üks sõnum ja märgi loetuks
 * @access  Private/Admin
 */
router.get('/sonumid/:id', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const { id } = req.params;

    const messages = await query('SELECT * FROM contact_messages WHERE id = ?', [id]);

    if (!messages || messages.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Sõnumit ei leitud'
        });
    }

    // Märgi loetuks
    await query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [id]);

    res.json({
        success: true,
        data: messages[0]
    });
}));

/**
 * @route   PUT /api/admin/sonumid/:id
 * @desc    Uuenda sõnumi staatust
 * @access  Private/Admin
 */
router.put('/sonumid/:id', authenticate, authorize('admin', 'manager'), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { is_read, replied } = req.body;

    const updates = [];
    const params = [];

    if (is_read !== undefined) {
        updates.push('is_read = ?');
        params.push(is_read ? 1 : 0);
    }

    if (replied !== undefined) {
        updates.push('replied = ?');
        params.push(replied ? 1 : 0);
    }

    if (updates.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Ei ole midagi uuendada'
        });
    }

    params.push(id);

    await query(
        `UPDATE contact_messages SET ${updates.join(', ')} WHERE id = ?`,
        params
    );

    const messages = await query('SELECT * FROM contact_messages WHERE id = ?', [id]);

    res.json({
        success: true,
        data: messages[0],
        message: 'Sõnum uuendatud'
    });
}));

/**
 * @route   DELETE /api/admin/sonumid/:id
 * @desc    Kustuta sõnum
 * @access  Private/Admin
 */
router.delete('/sonumid/:id', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
    const { id } = req.params;

    await query('DELETE FROM contact_messages WHERE id = ?', [id]);

    res.json({
        success: true,
        message: 'Sõnum kustutatud'
    });
}));

module.exports = router;
