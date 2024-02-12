import { connect } from 'mongoose';
import { Config } from '../config';
import User from './user';

export interface IModels {
  findById: any;
  User: typeof User;
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    console.log('Connected to database');

    await User.createCollection();

    return {
        User
    };
  } catch (e) {
    return `Error while connecting to database :: ${e}`;
  }
}
