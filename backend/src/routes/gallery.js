const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * @route   GET /api/gallery
 * @desc    Hangi galerii pildid (public - only active)
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
    const images = await Gallery.getAll();

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
    const image = await Gallery.getById(req.params.id);

    if (!image) {
        return res.status(404).json({
            success: false,
            error: { message: 'Pilti ei leitud' }
        });
    }

    res.json({
        success: true,
        data: image
    });
}));

module.exports = router;
