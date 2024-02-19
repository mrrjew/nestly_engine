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
      uploadImages: async function (_: any, args: any, context: any) {
        const message = await appContext.services.ApartmentImagesService.uploadImages(args.UploadImagesInput, context.user._id)
        return message
      },
    },
  };
}
