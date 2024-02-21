import { IModels } from '../models';
import { IServices } from '../services';
export interface IAppContext {
  models?: IModels;
  services?: IServices;
}

export default class IService {
  models?: IModels;
  context?: IAppContext;
  constructor(context: IAppContext) {
    this.models = context.models;
    this.context = context;
  }

  async authenticate_user(userId: any) {
    const user = await this.context.models.User.findOne({ _id: userId });

    if (!user) {
      throw new Error('User not authenticated');
    }

    return user
  }

  async authenticate_apartment(apartment: any) {
    const _apartment = await this.models.Apartment.findOne({ _id: apartment });

    if (!_apartment) {
      throw new Error('Apartment not found');
    }

    return _apartment
  }

  async authenticate_booking(booking: any){
    const _booking = await this.models.ApartmentBooking.findOne({ _id: booking });

    if (!booking) {
      throw new Error('Booking not found');
    }

    return _booking
  }
}
