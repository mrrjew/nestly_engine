import IService, { IAppContext } from '../types/app';
import { IApartmentBooking, IApartmentBookingInput } from '../types/booking';

export default class ApartmentBookingService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getApartmentBooking(GetApartmentBookingInput: any, userId: any) {
    try {
      await this.authenticate_user(userId);

      const { apartment} = GetApartmentBookingInput;

      const booking = await this.models.ApartmentBooking.findOne({apartment})

      return booking;
    } catch (e) {
      throw new Error(`Error getting user's aparment booking: ${e}`);
    }
  }

  async createApartmentBooking(
    CreateApartmentBookingInput: IApartmentBookingInput,
    userId: any
  ): Promise<IApartmentBooking> {
    try {
      await this.authenticate_user(userId);

      const { apartment } = CreateApartmentBookingInput;

      await this.authenticate_apartment(apartment);

      const booking = await this.models.ApartmentBooking.create({ user: userId, ...CreateApartmentBookingInput });

      return booking;
    } catch (e) {
      throw new Error(`Error creating booking: ${e}`);
    }
  }

  async updateApartmentBooking(UpdateApartmentBookingInput: any, userId: any): Promise<IApartmentBooking> {
    try {
      await this.authenticate_user(userId);

      const { booking } = UpdateApartmentBookingInput;

      const _booking = await this.authenticate_booking(booking);

      _booking.updateOne({ $set: { ...UpdateApartmentBookingInput } });

      return _booking;
    } catch (e) {
      throw new Error(`Error updating booking`);
    }
  }

  async deleteApartmentBooking(bookingId: any, userId: any) {
    try {
      await this.authenticate_user(userId);

      const _booking = await this.authenticate_booking(bookingId);

      await _booking.deleteOne();

      return 'deleted booking successfully';
    } catch (e) {
      throw new Error(`Error deleting user: ${e}`);
    }
  }
}
