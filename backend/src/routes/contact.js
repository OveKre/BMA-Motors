const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { sendEmail } = require('../config/email');
const { asyncHandler, handleValidationError } = require('../middleware/errorHandler');
const { formLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/contact
 * @desc    Saada kontakts ônum
 * @access  Public (rate limited)
 */
router.post('/',
    formLimiter,
    [
        body('name').trim().notEmpty().withMessage('Nimi on kohustuslik'),
        body('email').isEmail().withMessage('Vale e-maili formaat'),
        body('message').trim().notEmpty().withMessage('Sõnum on kohustuslik'),
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw handleValidationError(errors.array());
        }

        const { name, email, phone, subject, message } = req.body;

        // Salvesta andmebaasi
        const result = await query(
            `INSERT INTO contact_messages (name, email, phone, subject, message) 
             VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone || null, subject || 'Üldjuhtum', message]
        );

        // Saada teavitus adminile
        if (process.env.SMTP_USER) {
            await sendEmail({
                to: process.env.SMTP_USER,
                subject: `Uus kontaktsõnum: ${subject || 'Üldjuhtum'}`,
                html: `
                    <h2>Uus kontaktsõnum</h2>
                    <p><strong>Nimi:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefon:</strong> ${phone || 'N/A'}</p>
                    <p><strong>Teema:</strong> ${subject || 'Üldjuhtum'}</p>
                    <p><strong>Sõnum:</strong></p>
                    <p>${message}</p>
                `
            });
        }

        res.status(201).json({
            success: true,
            data: { id: result.insertId },
            message: 'Sõnum saadetud edukalt'
        });
    })
);

/**
 * @route   GET /api/contact
 * @desc    Hangi kõik kontaktsõnumid (admin)
 * @access  Private/Admin
 */
router.get('/', asyncHandler(async (req, res) => {
    const messages = await query(
        'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100'
    );

    res.json({
        success: true,
        data: messages,
        count: messages.length
    });
}));

module.exports = router;
