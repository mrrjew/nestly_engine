"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        name: "nestly",
        port: process.env.PORT || 800,
        env: "production",
    },
    auth: {
        accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
        accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
        refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
        refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    },
    db: {
        uri: process.env.PROD_MONGO_URI || "",
    },
    smtp: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE || true
    },
    logger: {
        level: process.env.LOGGER_LEVEL
    }
};
exports.default = config;
//# sourceMappingURL=production.js.map