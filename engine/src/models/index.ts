import { connect } from 'mongoose';
import { Config } from '../config';
import User from './user/user';
import log from '../utils/log';
import UserProfile from './user/profile';
import UserRating from './user/rating';
import UserSettings from './user/settings';

export interface IModels {
  User: typeof User;
  UserProfile: typeof UserProfile;
  UserRating: typeof UserRating;
  UserSettings: typeof UserSettings
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info("Connected to database successfully")

    await User.createCollection();
    await UserProfile.createCollection();
    await UserRating.createCollection()
    await UserSettings.createCollection()

    return {
      User,
      UserProfile,
      UserRating,
      UserSettings
    };
  } catch (e) {
    throw new Error(`Error while connecting to database :: ${e}`);
  }
}
