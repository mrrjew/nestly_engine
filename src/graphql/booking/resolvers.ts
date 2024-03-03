import { IAppContext } from '../../types/app';

const resolvers = (appContext: IAppContext) => {
  return {
    Booking: {
      __resolveReference: async function (_: any) {
        return appContext.models.ApartmentBooking.find(_._id);
      },
    },
    Query: {
      getApartmentBooking: async function (_: any, { GetApartmentBookingInput }, context: any) {
        const bookings = appContext.services.ApartmentBookingService.getApartmentBooking(
          GetApartmentBookingInput,
          context.user._id
        );
        return bookings;
      },
    },

    Mutation: {
      createApartmentBooking: async function (_: any, { CreateApartmentBookingInput }, context: any) {
        const booking = appContext.services.ApartmentBookingService.createApartmentBooking(
          CreateApartmentBookingInput,
          context.user._id
        );
        return booking;
      },
      updateApartmentBooking: async function (_: any, { UpdateApartmentBookingInput }, context: any) {
        const booking = appContext.services.ApartmentBookingService.createApartmentBooking(
          UpdateApartmentBookingInput,
          context.user._id
        );
        return booking;
      },
      deleteApartmentBooking: async function (_: any, { DeleteApartmentBookingInput }, context: any) {
        const message = appContext.services.ApartmentBookingService.createApartmentBooking(
          DeleteApartmentBookingInput.apartmentId,
          context.user._id
        );
        return message;
      },
    },
  };
};

export default resolvers;
