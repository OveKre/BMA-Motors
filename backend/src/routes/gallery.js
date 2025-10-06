const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/gallery
 * @desc    Hangi galerii pildid
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
    const { category, limit = 50 } = req.query;

    let sql = 'SELECT * FROM gallery_images WHERE is_active = true';
    const params = [];

    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    sql += ' ORDER BY display_order ASC, created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const images = await query(sql, params);

    res.json({
        success: true,
        data: images,
        count: images.length
    });
}));

/**
 * @route   GET /api/gallery/:id
 * @desc    Hangi pildi detailid
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
    const results = await query(
        'SELECT * FROM gallery_images WHERE id = ?',
        [req.params.id]
    );

    if (!results || results.length === 0) {
        return res.status(404).json({
            success: false,
            error: { message: 'Pilti ei leitud' }
        });
    }

    res.json({
        success: true,
        data: results[0]
    });
}));

module.exports = router;
