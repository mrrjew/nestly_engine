import { connect } from 'mongoose';
import { Config } from '../config';
import log from '../utils/log';

// user
import User from './user/user';

//apartment
import Apartment from './apartment/apartment';

// booking
import ApartmentBooking from './booking/booking';

export interface IModels {
  User: typeof User;
  Apartment: typeof Apartment;
  ApartmentBooking: typeof ApartmentBooking;
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info('Connected to database successfully');

    await User.createCollection();
    await Apartment.createCollection();
    await ApartmentBooking.createCollection()

    return {
      User,
      Apartment,
      ApartmentBooking
    };
  } catch (e) {
    throw new Error(`Error while connecting to database : ${e}`);
  }
}
