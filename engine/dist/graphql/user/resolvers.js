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
            createuser: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const { user, token } = yield appContext.services.UserService.registerUser(args.inputs);
                    return { user, token };
                });
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map