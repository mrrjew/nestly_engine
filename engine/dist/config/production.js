"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
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
};
exports.default = config;
