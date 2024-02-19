import { Types } from 'mongoose';
import { IApartment } from '../../types/apartment/apartment';
import IService, { IAppContext } from '../../types/app';
import { IUser } from '../../types/user/user';

export default class ApartmentService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }
  async getAllApartments(GetAllApartmentsInput: any) {
    const { filters, sort, pagination, search } = GetAllApartmentsInput;

    let query = {};

    // filter
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          // Checking if the value of the field is an object with a comparison operator
          if (typeof filters[key] === 'object' && Object.keys(filters[key]).length === 1) {
            const operator = Object.keys(filters[key])[0];
            const value = filters[key][operator];

            // Constructing the MongoDB query operator dynamically
            query[key] = { [`$${operator}`]: value };
          } else {
            // If no comparison operator is provided, treat it as an equality comparison
            query[key] = filters[key];
          }
        }
      }
    }

    // search
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query['$or'] = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
      ];
    }

    // sort
    let sortCriteria = {};
    if (sort) {
      sortCriteria = sort;
    }

    //apply pagination if provided
    let { limit, offset } = pagination;
    limit = limit || 10;
    offset = offset || 0;

    const apartments = await this.models.Apartment.find(query).sort(sortCriteria).skip(offset).limit(limit);

    return apartments;
  }

  async getAllOwnerApartments(userId: any) {
    try {
      const apartments = await this.models.Apartment.find({ owner: userId }).exec();
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

  async deleteApartment(DeleteApartmentInput: { id: Types.ObjectId }, userId: any) {
    try {
      const { id } = DeleteApartmentInput;
      const apartment = await this.models.Apartment.findById(id);

      if (!apartment) {
        return 'No apartment found';
      }

      const owner = apartment.owner.toString();
      if (userId !== owner) {
        throw new Error(`Apartment doesn't belong to user`);
      }

      await apartment.deleteOne();

      return 'Apartment deleted successfully';
    } catch (e) {
      throw new Error(`Error deleting apartment: ${e}`);
    }
  }
}
