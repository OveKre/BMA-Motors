const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const SparePartInquiry = require('../models/SparePartInquiry');
const { sendEmail, emailTemplates } = require('../config/email');
const { asyncHandler, handleValidationError } = require('../middleware/errorHandler');
const { formLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/spareparts/inquiry
 * @desc    Loo uus varuosapäring
 * @access  Public (rate limited)
 */
router.post('/inquiry',
    formLimiter,
    [
        body('client_name').trim().notEmpty().withMessage('Nimi on kohustuslik'),
        body('client_email').isEmail().withMessage('Vale e-maili formaat'),
        body('client_phone').trim().notEmpty().withMessage('Telefon on kohustuslik'),
        body('car_make').trim().notEmpty().withMessage('Auto mark on kohustuslik'),
        body('car_model').trim().notEmpty().withMessage('Auto mudel on kohustuslik'),
        body('sparepart_name').trim().notEmpty().withMessage('Varuosa nimetus on kohustuslik'),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw handleValidationError(errors.array());
        }

        const inquiry = await SparePartInquiry.create(req.body);

        // Saada kinnitusmail
        const lang = req.body.language || 'est';
        const template = emailTemplates.inquiryConfirmation(inquiry, lang);

        await sendEmail({
            to: inquiry.client_email,
            subject: template.subject,
            html: template.html
        });

        res.status(201).json({
            success: true,
            data: inquiry,
            message: 'Päring saadetud edukalt',
            emailSent: true,
            emailType: 'inquiry_confirmation',
            recipient: inquiry.client_email
        });
    })
);

/**
 * @route   GET /api/spareparts/inquiry
 * @desc    Hangi kõik päringud (filtritega)
 * @access  Public (piiratud)
 */
router.get('/inquiry', asyncHandler(async (req, res) => {
    const filters = {
        status_id: req.query.status_id,
        date_from: req.query.date_from,
        date_to: req.query.date_to,
        car_make: req.query.car_make,
        limit: req.query.limit || 50,
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
 * @route   GET /api/spareparts/inquiry/:id
 * @desc    Hangi päringu detailid
 * @access  Public
 */
router.get('/inquiry/:id', asyncHandler(async (req, res) => {
    const inquiry = await SparePartInquiry.findById(req.params.id);

    if (!inquiry) {
        return res.status(404).json({
            success: false,
            error: { message: 'Päringut ei leitud' }
        });
    }

    res.json({
        success: true,
        data: inquiry
    });
}));

module.exports = router;
