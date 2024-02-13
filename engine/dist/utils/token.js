"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports._generateToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("../config"));
const graphql_1 = require("graphql");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const _generateToken = (id) => {
    try {
        const token = jsonwebtoken_1.default.sign({ id }, config_1.default.auth.secret, {
            expiresIn: config_1.default.auth.token_expiry,
        });
        return token;
    }
    catch (e) {
        throw e;
    }
};
exports._generateToken = _generateToken;
const verifyAccessToken = (token) => {
    console.log(token);
    try {
        if (!token) {
            throw new graphql_1.GraphQLError("No token", {
                extensions: {
                    code: "UNAUTHENTICATED - NO TOKEN",
                },
            });
        }
        let decoded;
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, tokenData) {
            if (err) {
                throw new graphql_1.GraphQLError(err.message, {
                    extensions: {
                        code: "UNAUTHENTICATED - TOKEN MALFORMED",
                    },
                });
            }
            decoded = tokenData;
        });
        return decoded;
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, {
            extensions: {
                code: "UNAUTHENTICATED",
            },
        });
    }
};
exports.verifyAccessToken = verifyAccessToken;
//# sourceMappingURL=token.js.map