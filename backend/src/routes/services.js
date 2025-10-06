const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/services
 * @desc    Hangi kõik teenused
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
    const activeOnly = req.query.active === 'true';
    const services = await Service.findAll(activeOnly);

    res.json({
        success: true,
        data: services,
        count: services.length
    });
}));

/**
 * @route   GET /api/services/categories
 * @desc    Hangi teenuste kategooriad
 * @access  Public
 */
router.get('/categories', asyncHandler(async (req, res) => {
    const categories = await Service.getCategories();

    res.json({
        success: true,
        data: categories
    });
}));

/**
 * @route   GET /api/services/category/:category
 * @desc    Hangi teenused kategooria järgi
 * @access  Public
 */
router.get('/category/:category', asyncHandler(async (req, res) => {
    const { category } = req.params;
    const activeOnly = req.query.active !== 'false';
    
    const services = await Service.findByCategory(category, activeOnly);

    res.json({
        success: true,
        data: services,
        count: services.length
    });
}));

/**
 * @route   GET /api/services/:id
 * @desc    Hangi teenus ID järgi
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return res.status(404).json({
            success: false,
            error: { message: 'Teenust ei leitud' }
        });
    }

    res.json({
        success: true,
        data: service
    });
}));

module.exports = router;
