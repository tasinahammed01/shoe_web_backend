"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
/**
 * Middleware to handle unmatched routes (404 Not Found)
 */
const notFoundHandler = (req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    res.status(404).json({
        success: false,
        message: `Route Not Found - ${req.method} ${req.originalUrl}`,
    });
};
exports.notFoundHandler = notFoundHandler;
