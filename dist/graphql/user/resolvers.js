"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function default_1(appContext) {
    return {
        User: {
            __resolveReference: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield appContext.models.User.findById(_._id);
                });
            },
        },
        Query: {
            user: function (_, {}, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield appContext.models.User.findOne(context.user._id);
                        return user;
                    }
                    catch (err) {
                        throw new Error('Eror getting user in graphql');
                    }
                });
            },
        },
        Mutation: {
            createUser: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const { user } = yield appContext.services.UserService.registerUser(args.CreateUnverifiedUserInput);
                    return user;
                });
            },
            verifyUser: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const verified = yield appContext.services.UserService.verifyUser(args.VerifyUserInput);
                    return verified;
                });
            },
            forgotPassword: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const forgotPassword = yield appContext.services.UserService.forgotPassword(args.ForgotPasswordInput);
                    return forgotPassword;
                });
            },
            resetPassword: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const resetPassword = yield appContext.services.UserService.resetPassword(args.ResetPasswordInput);
                    return resetPassword;
                });
            },
            createUserSession: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tokens = yield appContext.services.UserSessionService.createUserSession(args.CreateUserSessionInput);
                    return tokens;
                });
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map