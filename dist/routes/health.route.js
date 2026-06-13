"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/health
 * @desc    Checks if the backend is running successfully
 * @access  Public
 */
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend Running Successfully',
    });
});
exports.default = router;
