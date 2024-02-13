"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../../types/app"));
const token_1 = require("../../utils/token");
class UserSessionService extends app_1.default {
    constructor(props) {
        super(props);
    }
    createUserSession(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = yield this.models.User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if (!user.verified) {
                throw new Error('Please verify your email');
            }
            const isValid = yield user.validatePassword(password);
            if (!isValid) {
                throw new Error('Invalid email or password');
            }
            const accessToken = (0, token_1.signJwt)(user._id, 'accessTokenPrivateKey', {
                expiresIn: '1d',
            });
            const refreshToken = (0, token_1.signJwt)(user._id, 'refreshTokenPrivateKey', {
                expiresIn: '1y',
            });
            return { accessToken, refreshToken };
        });
    }
}
exports.default = UserSessionService;
//# sourceMappingURL=session.js.map