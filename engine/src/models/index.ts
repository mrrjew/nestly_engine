import { connect } from 'mongoose';
import { Config } from '../config';
import log from '../utils/log';
import colors from 'colors';

// user
import User from './user/user';
import UserProfile from './user/profile';
import UserRating from './user/rating';
import UserSettings from './user/settings';

//apartment
import Apartment from './apartment/apartment';
import ApartmentBooking from './apartment/booking';
import ApartmentReview from './apartment/review';
import ApartmentImage from './apartment/image';

export interface IModels {
  User: typeof User;
  UserProfile: typeof UserProfile;
  UserRating: typeof UserRating;
  UserSettings: typeof UserSettings;
  Apartment: typeof Apartment;
  ApartmentBooking: typeof ApartmentBooking;
  ApartmentReview: typeof ApartmentReview;
  ApartmentImage: typeof ApartmentImage;
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info('Connected to database successfully');

    await User.createCollection();
    await UserProfile.createCollection();
    await UserRating.createCollection();
    await UserSettings.createCollection();
    await Apartment.createCollection();
    await ApartmentBooking.createCollection();
    await ApartmentReview.createCollection();
    await ApartmentImage.createCollection();

    return {
      User,
      UserProfile,
      UserRating,
      UserSettings,
      Apartment,
      ApartmentBooking,
      ApartmentReview,
      ApartmentImage,
    };
  } catch (e) {
    throw new Error(`Error while connecting to database :: ${e}`);
  }
}
