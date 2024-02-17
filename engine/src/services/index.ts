import { IAppContext } from '../types/app';

// apartment
import ApartmentService from './apartment/apartment';

//user
import UserProfileService from './user/profile';
import UserRatingService from './user/rating';
import UserSessionService from './user/session';
import UserSettingsService from './user/settings';
import UserService from './user/user';

export interface IServices {
  UserService: UserService;
  UserSessionService: UserSessionService;
  UserProfileService: UserProfileService
  UserRatingService: UserRatingService
  UserSettingsService: UserSettingsService
  ApartmentService: ApartmentService
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService : new UserSessionService(context),
    UserProfileService: new UserProfileService(context),
    UserRatingService: new UserRatingService(context),
    UserSettingsService: new UserSettingsService(context),
    ApartmentService: new ApartmentService(context)
  };
}
