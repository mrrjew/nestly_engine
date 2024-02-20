import { Query } from 'mongoose';
import { IAppContext } from '../../types/app';

export default function (appContext: IAppContext) {
  return {
    Apartment: {
      __resolveReference: async function (_: any) {
        return appContext.models.Apartment.findById(_._id);
      },
    },
    Query: {
      getAllOwnerApartments: async function (_: any, {}, context: any) {
        const apartments = await appContext.services.ApartmentService.getAllOwnerApartments(context.user._id);
        return apartments;
      },
      getAllApartments: async function (_: any, args: any, context: any) {
        const apartments = await appContext.services.ApartmentService.getAllApartments(args.GetAllApartmentsInput);
        return apartments;
      },
      getAllApartmentReviews: async function(_:any,{GetAllApartmentReviewsInput}:any){
        const reviews = await appContext.services.ApartmentReviewService.getAllApartmentReviews(GetAllApartmentReviewsInput.apartmentId)
        return reviews;
      },
      getAllApartmentBookings: async function(_:any,{GetAllApartmentBookingsInput},context:any){
        const bookings = await appContext.services.ApartmentBookingService.getAllApartmentBookings(
          GetAllApartmentBookingsInput.apartmentId,context.user._id
        )
        return bookings
      }
    },

    Mutation: {
      createApartment: async function (_: any, args: any, context: any) {
        const apartment = await appContext.services.ApartmentService.createApartment(
          args.CreateApartmentInput,
          context.user._id
        );
        return apartment;
      },
      updateApartment: async function (_: any, args: any, context: any) {
        const apartment = await appContext.services.ApartmentService.updateApartment(
          args.UpdateApartmentInput,
          context.user._id
        );
        return apartment;
      },
      deleteApartment: async function (_: any, args: any, context: any) {
        const apartment = await appContext.services.ApartmentService.deleteApartment(
          args.DeleteApartmentInput,
          context.user._id
        );
        return apartment;
      },
      createApartmentReview: async function(_:any, args:any,context:any) {
        const review = await appContext.services.ApartmentReviewService.createApartmentReview(
          args.CreateApartmentReviewInput,
          context.user._id
        )
        return review
      },
      deleteApartmentReview: async function(_:any,args:any,context:any){
        const message = await appContext.services.ApartmentReviewService.deleteApartmentReview(
          args.DeleteApartmentReviewInput,
          context.user._id
        )
        return message
      },
      createApartmentBooking: async function(_:any,args:any,context:any){
        const booking = await appContext.services.ApartmentBookingService.createApartmentBooking(
          args.CreateApartmentBookingInput,
          context.user._id
        )
        return booking
      },
      uploadImages: async function (_: any, args: any, context: any) {
        const message = await appContext.services.ApartmentImagesService.uploadImages(args.UploadImagesInput, context.user._id)
        return message
      },
    },
  };
}
