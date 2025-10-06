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

module.exports = router;
