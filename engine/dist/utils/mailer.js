"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const log_1 = tslib_1.__importDefault(require("./log"));
function createTestCreds() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const creds = yield nodemailer_1.default.createTestAccount();
        log_1.default.info(creds);
    });
}
exports.default = createTestCreds;
// createTestCreds()
//# sourceMappingURL=mailer.js.map