import { IApartment } from '../../types/apartment/apartment';
import IService, { IAppContext } from '../../types/app';
import { IUser } from '../../types/user/user';

export default class ApartmentService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getAllOwnerApartments(userId: any) {
    try {
      const apartments = await this.models.Apartment.find().exec();
      return apartments;
    } catch (e) {
      throw new Error(`Error getting owner apartments: ${e}`);
    }
  }

  async createApartment(CreateApartmentInput: IApartment, userId: any) {
    try {
      const user = await this.models.User.findById(userId);
      if (!user) {
        throw new Error(`No user found`);
      }

      if (user.type !== 'OWNER') {
        throw new Error(`Renters cannot create apartments`);
      }

      const apartment = this.models.Apartment.create({ owner: userId, ...CreateApartmentInput });

      return apartment;
    } catch (e) {
      throw new Error(`Error creating apartment`);
    }
  }

  async updateApartment(UpdateApartmentInput: any, userId: any) {
    try {
      const user = await this.models.User.findById(userId);
      if (!user) {
        throw new Error(`No user found`);
      }

      if (user.type !== 'OWNER') {
        throw new Error(`Renters cannot create apartments`);
      }

      const apartment = await this.models.Apartment.findOneAndUpdate(
        { owner: userId },
        { $set: { owner: userId, ...UpdateApartmentInput } }
      );

      return apartment;
    } catch (e) {
      throw new Error(`Error updating apartment: ${e}`);
    }
  }
}
