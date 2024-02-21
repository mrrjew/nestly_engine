import IService, { IAppContext } from '../../types/app';
import { IApartmentBooking, IApartmentBookingInput } from '../../types/booking/booking';
import { generateQuery } from '../../utils/query';

export default class ApartmentBookingService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getApartmentBooking(GetApartmentBookingInput: any, userId: any) {
    try {
      await this.authenticate_user(userId);

    const { filters,sort,pagination,search } = GetApartmentBookingInput;

    const {query,sortCriteria,limit,offset} = generateQuery(filters,sort,pagination,search )
  
    const bookings = this.models.ApartmentBooking.find(query).sort(sortCriteria).skip(offset).limit(limit)
  
    return bookings
    }catch(e){
      throw new Error(`Error getting user's aparment bookings`)
    }
  }

  async createApartmentBooking(
    CreateApartmentBookingInput: IApartmentBookingInput,
    userId: any
  ): Promise<IApartmentBooking> {
    try {
      const user = await this.models.User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { apartment } = CreateApartmentBookingInput;

      await this.authenticate_apartment(apartment);

      const booking = await this.models.ApartmentBooking.create({ user: userId, ...CreateApartmentBookingInput });

      return booking;
    } catch (e) {
      throw new Error(`Error creating booking`);
    }
  }

  async updateApartmentBooking(UpdateApartmentBookingInput: any, userId: any): Promise<IApartmentBooking> {
    try {
      const user = await this.models.User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User not authenticated');
      }

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
      const user = await this.models.User.findOne({ _id: userId });

      if (!user) {
        throw new Error('User not authenticated');
      }

      const _booking = await this.authenticate_booking(bookingId);

      await _booking.deleteOne();
    } catch (e) {
      throw new Error(`Error deleting user: ${e}`);
    }
  }
}
