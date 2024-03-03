"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../types/app"));
const token_1 = require("../utils/token");
class UserService extends app_1.default {
    constructor(context) {
        super(context);
    }
    registerUser(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const _user = yield this.models.User.find({ email: payload.email });
                if (_user.length)
                    throw new Error('User already exists');
                const user = new this.models.User(Object.assign({}, payload));
                yield user.save();
                const token = (0, token_1._generateToken)(user._id);
                return {
                    token,
                    user,
                };
            }
            catch (e) {
                throw new Error('Error creating new user');
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map