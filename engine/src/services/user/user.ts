import { Config } from '../../config';
import IService, { IAppContext } from '../../types/app';
import { IUserAuth, IUserInput } from '../../types/user/user';
import sendEmail from '../../utils/mailer';

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async registerUser(payload: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.models.User.find({ email: payload.email });
      if (_user.length) throw new Error('User already exists');

      const user = new this.models.User({ ...payload });
      await user.save();

      await sendEmail({
        from:"test@example.com",
        to:user.email,
        subject:"Please verify your account",
        text:`Verification code : ${user.verificationCode}. Id : ${user._id}`,
       });

      return {
        user,
      };
    } catch (e) {
      throw new Error('Error creating new user');
    }
  }
}
