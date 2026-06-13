"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const startServer = async () => {
    // Connect to MongoDB
    await (0, db_1.connectDB)();
    // Start HTTP Server
    const server = app_1.default.listen(env_1.env.PORT, () => {
        console.log(`[Server] Running in ${env_1.env.NODE_ENV} mode on port ${env_1.env.PORT}`);
        console.log(`[Server] Health Check URL: http://localhost:${env_1.env.PORT}/api/health`);
    });
    // Handle port already in use error
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`[Server] Port ${env_1.env.PORT} is already in use. Stop the existing process and retry.`);
        }
        else {
            console.error(`[Server] Unexpected error: ${err.message}`);
        }
        process.exit(1);
    });
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        console.error(`Unhandled Rejection Error: ${err.message}`);
        server.close(() => process.exit(1));
    });
};
startServer();
