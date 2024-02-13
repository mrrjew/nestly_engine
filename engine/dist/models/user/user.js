"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['OWNER', 'AGENT', 'RENTER'], required: true },
    verificationCode: { type: String, required: true, default: () => (0, uuid_1.v4)() },
    passwordResetCode: { type: String, required: false },
});
userSchema.pre("save", function (next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
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
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map