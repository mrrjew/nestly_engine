import { v4 } from 'uuid';
import { Config } from '../../config';
import IService, { IAppContext } from '../../types/app';
import { IUserAuth, IUserInput, IUserResetPasswordInput, IUserVerificationInput } from '../../types/user/user';
import sendEmail from '../../utils/mailer';
import log from '../../utils/log';

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async registerUser(CreateUnverifiedUserInput: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.models.User.find({ email: CreateUnverifiedUserInput.email });
      if (_user.length) throw new Error('User already exists');

      const user = new this.models.User({ ...CreateUnverifiedUserInput });
      await user.save();

      await sendEmail({
        from: 'jwlarbi15@gmail.com',
        to: user.email,
        subject: 'Please verify your account',
        text: `Verification code : ${user.verificationCode}. Id : ${user._id}`,
      });

      return {
        user,
      };
    } catch (e) {
      throw new Error('Error creating new user');
    }
  }

  async verifyUser(VerifyUserInput: IUserVerificationInput) {
    const { id, verificationCode } = VerifyUserInput;

    // find the user by Id
    const user = await this.models.User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // check to see if they are already verified
    if (user.verified) {
      throw new Error('User is already verified');
    }

    // check to see if verificationCode matches
    if (user.verificationCode === verificationCode) {
      user.verified = true;

      await user.save();

      return true;
    }
  }

  async forgotPassword(ForgotPasswordInput: { email: string }) {
    const { email } = ForgotPasswordInput;

    const user = await this.models.User.findOne({ email });

    if (!user) {
      throw new Error('user not found');
    }

    if (!user.verified) {
      throw new Error('user is not verified');
    }

    const passwordResetCode = v4();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendEmail({
      to: user.email,
      from: 'test@example.com',
      subject: 'Reset your password',
      text: `Password reset code: ${passwordResetCode}. Id: ${user._id}`,
    });

    log.debug(`Password reset code sent to ${user.email}`);

    const message = 'password reset code sent';
    return message;
  }

  async resetPassword(ResetPasswordInput: IUserResetPasswordInput) {
    const { id, passwordResetCode, newPassword } = ResetPasswordInput;

    const user = await this.models.User.findById(id);

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
      throw new Error('Could not reset password');
    }

    user.passwordResetCode = null;

    user.password = newPassword;

    await user.save();

    const message = 'Successfully updated password';
    return message;
  }
}
