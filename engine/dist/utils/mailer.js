"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const log_1 = tslib_1.__importDefault(require("./log"));
const config_1 = tslib_1.__importDefault(require("../config"));
// export default async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//     console.log(creds)
// }
// createTestCreds()
const smtp = config_1.default.smtp;
const transporter = nodemailer_1.default.createTransport(Object.assign(Object.assign({}, smtp), { auth: { user: smtp.user, pass: smtp.pass } }));
function sendEmail(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        transporter.sendMail(payload, (err, info) => {
            if (err) {
                log_1.default.error(err, "Error sending mail");
            }
            log_1.default.info(`Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
        });
    });
}
exports.default = sendEmail;
//# sourceMappingURL=mailer.js.map