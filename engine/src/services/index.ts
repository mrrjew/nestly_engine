import { IAppContext } from '../types/app';
import UserSessionService from './user/session';
import UserService from './user/user';

export interface IServices {
  UserService: UserService;
  UserSessionService: UserSessionService
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService : new UserSessionService(context)
  };
}
