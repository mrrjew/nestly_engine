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
        secret: process.env.JWT_SECRET || "",
        token_expiry: process.env.TOKEN_EXPIRY || "",
    },
    db: {
        uri: process.env.PROD_MONGO_URI || "",
    },
    mail: {
        username: process.env.MAILGUN_USERNAME || "",
        key: process.env.MAILGUN_API_KEY || "",
        domain: process.env.MAIL_DOMAIN || "",
    },
    logger: {
        level: process.env.LOGGER_LEVEL
    }
};
exports.default = config;
//# sourceMappingURL=production.js.map