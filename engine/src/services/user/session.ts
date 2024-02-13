import IService, { IAppContext } from '../../types/app';
import { IUserInput } from '../../types/user/user';
import { signJwt } from '../../utils/token';

export default class UserSessionService extends IService {
  constructor(props: IAppContext) {
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

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = signJwt(user._id, 'accessTokenPrivateKey', {
      expiresIn: '1d',
    });

    const refreshToken = signJwt(user._id, 'refreshTokenPrivateKey', {
      expiresIn: '1y',
    });

    return {accessToken,refreshToken};
  }
}
