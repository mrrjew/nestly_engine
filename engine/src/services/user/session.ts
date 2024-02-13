import IService, { IAppContext } from '../../types/app';
import { IUserInput } from '../../types/user/user';

export default class UserSessionService extends IService {
  construction(props: IAppContext) {
    super(props);
  }

  async createUserSession(input: IUserInput) {
    const { email, password } = input;

    const user = await this.models.User.findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.verified) {
      throw new Error('Please verify your email');
    }

    const isValid = await user.validatePassword(password)
  }
}
