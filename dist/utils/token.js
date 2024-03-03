"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const privateKeyPath = path_1.default.resolve(__dirname, '../../privateKey.pem');
const publicKeyPath = path_1.default.resolve(__dirname, '../../publicKey.pem');
const privateKey = fs_1.default.readFileSync(privateKeyPath);
const publicKey = fs_1.default.readFileSync(publicKeyPath);
function signJwt(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (e) {
        // Optionally handle or log the error
        throw e;
    }
}
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=token.js.map