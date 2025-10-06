const express = require('express');
const router = express.Router();
const axios = require('axios');
const { query } = require('../config/database');
const { asyncHandler } = require('../middleware/errorHandler');
const logger = require('../config/logger');

const CARQUERY_API = process.env.CARQUERY_API_URL || 'https://www.carqueryapi.com/api/0.3/';

/**
 * @route   GET /api/cars/makes
 * @desc    Hangi kõik auto margid
 * @access  Public
 */
router.get('/makes', asyncHandler(async (req, res) => {
    const makes = await query('SELECT * FROM car_makes ORDER BY make_display');

    res.json({
        success: true,
        data: makes,
        count: makes.length
    });
}));

/**
 * @route   GET /api/cars/models/:makeId
 * @desc    Hangi mudelid margi järgi
 * @access  Public
 */
router.get('/models/:makeId', asyncHandler(async (req, res) => {
    const { makeId } = req.params;
    
    const models = await query(
        'SELECT * FROM car_models WHERE make_id = ? ORDER BY model_name',
        [makeId]
    );

    res.json({
        success: true,
        data: models,
        count: models.length
    });
}));

/**
 * @route   GET /api/cars/search
 * @desc    Otsi autosid CarQuery API kaudu
 * @access  Public
 */
router.get('/search', asyncHandler(async (req, res) => {
    const { make, year } = req.query;

    try {
        const response = await axios.get(CARQUERY_API, {
            params: {
                cmd: 'getModels',
                make: make,
                year: year
            }
        });

        const models = response.data.Models || [];

        res.json({
            success: true,
            data: models,
            count: models.length
        });
    } catch (error) {
        logger.error('CarQuery API error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Autode andmete laadimine ebaõnnestus' }
        });
    }
}));

module.exports = router;
