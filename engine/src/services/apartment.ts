import { Types } from 'mongoose';
import { IApartment } from '../types/apartment';
import IService, { IAppContext } from '../types/app';
import { generateQuery } from '../utils/query';

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

  async uploadImages(useId:any,userId:any){
    try {

    await this.authenticate_user(userId);
    const apartment = await this.authenticate_apartment(useId)

    // Images are from a standalone file upload engine
    const apartmentImages = await this.models.Image.find({useId}).limit(5)

    const images = [...apartmentImages].reverse()

    
    if(images){
      await apartment.updateOne({
        $set : {images}
      },{new:true,upsert:true})
      await apartment.save()
      
      return 'images uploaded successfully'
    }
    }catch(e){
      throw new Error(`Error uploading images: ${e}`)
    }
  
  }


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
