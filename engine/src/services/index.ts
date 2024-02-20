import { IAppContext } from '../types/app';

// apartment
import ApartmentService from './apartment/apartment';
import ApartmentBookingService from './apartment/booking';
import ApartmentImagesService from './apartment/image';
import ApartmentReviewService from './apartment/review';

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

  // apartment
  ApartmentService: ApartmentService
  ApartmentImagesService: ApartmentImagesService
  ApartmentReviewService: ApartmentReviewService
  ApartmentBookingService: ApartmentBookingService
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService : new UserSessionService(context),
    UserProfileService: new UserProfileService(context),
    UserRatingService: new UserRatingService(context),
    UserSettingsService: new UserSettingsService(context),
    ApartmentService: new ApartmentService(context),
    ApartmentImagesService: new ApartmentImagesService(context),
    ApartmentReviewService: new ApartmentReviewService(context),
    ApartmentBookingService: new ApartmentBookingService(context)
  };
}
