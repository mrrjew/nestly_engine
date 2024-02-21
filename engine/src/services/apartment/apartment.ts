import { Types } from 'mongoose';
import { IApartment } from '../../types/apartment/apartment';
import IService, { IAppContext } from '../../types/app';
import { join, parse } from 'path';
import { createWriteStream } from 'fs';
import { generateQuery } from '../../utils/query';

export default class ApartmentService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }
  async getAllApartments(GetAllApartmentsInput: any) {
    const { filters, sort, pagination, search } = GetAllApartmentsInput;

    const { query, sortCriteria, limit, offset } = generateQuery(filters, sort, pagination, search);

    const apartments = await this.models.Apartment.find(query).sort(sortCriteria).skip(offset).limit(limit);

    return apartments;
  }

  async getAllOwnerApartments(userId: any) {
    try {
      const apartments = await this.models.Apartment.find({ owner: userId }).exec();
      return apartments;
    } catch (e) {
      throw new Error(`Error getting owner apartments: ${e} `);
    }
  }

  async createApartment(CreateApartmentInput: IApartment, userId: any, imageUrls?: any) {
    try {
      const user = await this.authenticate_user(userId);

      if (user.type !== 'OWNER' && !CreateApartmentInput['reviews']) {
        throw new Error(`Renters cannot create apartments`);
      }

      const apartment = await this.models.Apartment.create({ owner: userId, ...CreateApartmentInput });

      return apartment;
    } catch (e) {
      throw new Error(`Error creating apartment`);
    }
  }

  // async uploadImages(UploadImagesInput: any) {
  //   try {
  //     let { filename, createReadStream } = await UploadImagesInput.upload;

  //     const stream = createReadStream();

  //     let { ext, name } = parse(filename);

  //     name = name.replace(/([^a-z0-9 ]+)/gi, '_').replace(' ', '_');

  //     let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);

  //     const writeStream = createWriteStream(serverFile);

  //     await stream.pipe(writeStream);

  //     serverFile = `${URL}${serverFile.split('uploads')[1]}`;
  //   } catch (e) {
  //     throw new Error(`Error uploading images: ${e}`);
  //   }
  // }

  async updateApartment(UpdateApartmentInput: any, userId: any) {
    try {
      const user = await this.authenticate_user(userId);

      if (user.type !== 'OWNER') {
        throw new Error(`Cannot edit this apartment`);
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

      const apartment = await this.authenticate_apartment(id)

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
