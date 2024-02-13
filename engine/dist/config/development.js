"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        name: 'nestly',
        port: 800,
        env: 'development',
    },
    auth: {
        accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
        accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
        refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
        refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    },
    db: {
        uri: process.env.DEV_MONGO_URI || '',
    },
    smtp: {
        user: process.env.DEV_MAIL_USER,
        pass: process.env.DEV_MAIL_PASS,
        host: process.env.DEV_MAIL_HOST,
        port: process.env.DEV_MAIL_PORT,
        secure: process.env.DEV_MAIL_SECURE || false
    },
    logger: {
        level: process.env.LOGGER_LEVEL
    },
};
exports.default = config;
//# sourceMappingURL=development.js.map