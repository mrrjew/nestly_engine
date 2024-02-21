import { IAppContext } from '../types/app';

// apartment
import ApartmentService from './apartment/apartment';

//user
import UserService from './user/user';
import UserSessionService from './user/session';

export interface IServices {
  UserService: UserService;
  UserSessionService:UserSessionService;
  
  // apartment
  ApartmentService: ApartmentService
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService: new UserSessionService(context),
    ApartmentService: new ApartmentService(context),
  };
}
