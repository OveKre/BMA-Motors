const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { sendEmail, emailTemplates } = require('../config/email');
const { asyncHandler, handleValidationError } = require('../middleware/errorHandler');
const { formLimiter } = require('../middleware/rateLimiter');
const { optionalAuth } = require('../middleware/auth');

/**
 * @route   GET /api/booking/available-slots
 * @desc    Hangi vabad ajad konkreetsel kuupäeval
 * @access  Public
 */
router.get('/available-slots', asyncHandler(async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({
            success: false,
            error: { message: 'Kuupäev on kohustuslik' }
        });
    }

    const availableSlots = await Booking.getAvailableSlots(date);
    const bookedSlots = await Booking.getBookedSlots(date);

    res.json({
        success: true,
        data: {
            date,
            availableSlots,
            bookedSlots
        }
    });
}));

/**
 * @route   GET /api/booking/month-availability
 * @desc    Hangi kuu kõigi kuupäevade saadavus (kalendri jaoks)
 * @access  Public
 */
router.get('/month-availability', asyncHandler(async (req, res) => {
    const { year, month } = req.query;

    if (!year || !month) {
        return res.status(400).json({
            success: false,
            error: { message: 'Aasta ja kuu on kohustuslikud' }
        });
    }

    const availability = await Booking.getMonthAvailability(parseInt(year), parseInt(month));

    res.json({
        success: true,
        data: availability
    });
}));

/**
 * @route   POST /api/booking
 * @desc    Loo uus broneering
 * @access  Public (rate limited)
 */
router.post('/', 
    formLimiter,
    [
        body('client_name').trim().notEmpty().withMessage('Nimi on kohustuslik'),
        body('client_email').isEmail().withMessage('Vale e-maili formaat'),
        body('client_phone').trim().notEmpty().withMessage('Telefon on kohustuslik'),
        body('booking_date').isDate().withMessage('Vale kuupäeva formaat'),
        body('booking_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Vale kellaaja formaat'),
        body('service_id').optional().isInt().withMessage('Vale teenuse ID'),
    ],
    asyncHandler(async (req, res) => {
        // Kontrolli valideerimist
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw handleValidationError(errors.array());
        }

        const bookingData = req.body;
        const booking = await Booking.create(bookingData);

        // Saada kinnitusmail (keel tuleb frontendist)
        const lang = req.body.language || 'est';
        const template = emailTemplates.bookingConfirmation({
            ...booking,
            service_name: req.body.service_name
        }, lang);

        await sendEmail({
            to: booking.client_email,
            subject: template.subject,
            html: template.html
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Broneering loodud edukalt',
            emailSent: true,
            emailType: 'booking_confirmation',
            recipient: booking.client_email
        });
    })
);

/**
 * @route   GET /api/booking/:id
 * @desc    Hangi broneeringu detailid
 * @access  Public (oma broneeringud)
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(404).json({
            success: false,
            error: { message: 'Broneeringut ei leitud' }
        });
    }

    res.json({
        success: true,
        data: booking
    });
}));

/**
 * @route   GET /api/booking
 * @desc    Hangi kõik broneeringud (filtritega)
 * @access  Public (piiratud)
 */
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
    const filters = {
        status: req.query.status,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        service_id: req.query.service_id,
        limit: req.query.limit || 50,
        offset: req.query.offset || 0
    };

    const bookings = await Booking.findAll(filters);

    res.json({
        success: true,
        data: bookings,
        count: bookings.length
    });
}));

module.exports = router;
