import { IAppContext } from '../types/app';
import UserProfile from './user/profile';
import UserSessionService from './user/session';
import UserService from './user/user';

export interface IServices {
  UserService: UserService;
  UserSessionService: UserSessionService;
  UserProfile: UserProfile
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService : new UserSessionService(context),
    UserProfile: new UserProfile(context)
  };
}
