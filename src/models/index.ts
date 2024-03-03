import { connect } from 'mongoose';
import { Config } from '../config';
import log from '../utils/log';

// user
import User from './user/user';

//apartment
import Apartment from './apartment';

// booking
import ApartmentBooking from './booking';

// image upload
import Image from './image';

export interface IModels {
  User: typeof User;
  Apartment: typeof Apartment;
  ApartmentBooking: typeof ApartmentBooking;
  Image: typeof Image;
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info('Connected to database successfully');

    await User.createCollection();
    await Apartment.createCollection();
    await ApartmentBooking.createCollection();
    await Image.createCollection();

    return {
      User,
      Apartment,
      ApartmentBooking,
      Image
    };
  } catch (e) {
    throw new Error(`Error while connecting to database : ${e}`);
  }
}
