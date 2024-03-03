"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateField = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
exports.privateField = [
    "password",
    "__v",
    "verificationCode",
    "passwordResetCode",
    "verified"
];
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['OWNER', 'AGENT', 'RENTER'], required: true },
    verificationCode: { type: String, required: true, default: () => (0, uuid_1.v4)() },
    passwordResetCode: { type: String },
    verified: { type: Boolean, required: true, default: false }
});
userSchema.pre('save', function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        try {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(this.password, salt);
            this.password = hash;
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
userSchema.methods.validatePassword = function (pass) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(this.password, pass);
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map