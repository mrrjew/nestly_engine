"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("../config"));
const AccesskeyName = Object.assign({}, config_1.default.auth);
function signJwt(object, keyName, options) {
    const signingKey = Buffer.from(AccesskeyName[`${keyName}`], 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
function verifyJwt(token, keyName) {
    const publicKey = Buffer.from(AccesskeyName[`${keyName}`], "base64").toString("ascii");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (e) {
        throw new Error("Token verification failed");
    }
}
exports.verifyJwt = verifyJwt;
;
//# sourceMappingURL=token.js.map