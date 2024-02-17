// import { Request, Response } from 'express';
import { AnyKeys } from 'mongoose';
import IService, { IAppContext } from '../../types/app';
import { IUserInput } from '../../types/user/user';
import { findSessionById, signAccessToken, signRefreshToken } from '../../utils/session';
// import { get } from 'lodash';
import { verifyJwt } from '../../utils/token';

export default class UserSessionService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async createUserSession(input:any) {
    const { email } = input;

    const user = await this.models.User.findOne({ email });
    console.log(user)

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.verified) {
      throw new Error('Please verify your email');
    }

    const accessToken = signAccessToken(user);

    const refreshToken = await signRefreshToken({ userId: user._id });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = verifyJwt<{ session: string }>(refreshToken);

    if (!decoded) {
      throw new Error('Could not refresh access token');
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
      throw new Error('Could not refresh access token');
    }

    const user = await this.models.User.findById(String(session.userId));

    if (!user) {
      throw new Error('Could not refresh access token');
    }

    const accessToken = signAccessToken(user);

    return { accessToken };
  }
}
