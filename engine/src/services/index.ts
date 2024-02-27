import { IAppContext } from '../types/app';

// apartment
import ApartmentService from './apartment';

//user
import UserService from './user';
import UserSessionService from './session';
import ApartmentBookingService from './booking';

export interface IServices {
  UserService: UserService;
  UserSessionService:UserSessionService;
  
  // apartment
  ApartmentService: ApartmentService
  ApartmentBookingService: ApartmentBookingService
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService: new UserSessionService(context),
    ApartmentService: new ApartmentService(context),
    ApartmentBookingService: new ApartmentBookingService(context)
  };
}
