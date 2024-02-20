import IService, { IAppContext } from '../../types/app';
import { Types } from 'mongoose';

export default class ApartmentReviewService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getAllApartmentReviews(apartmentId: any) {
    try {
      const _apartment = this.models.Apartment.find({ _id: apartmentId }).exec();

      if (!_apartment) {
        throw new Error('No apartment found');
      }

      const reviews = this.models.ApartmentReview.find({ apartment: apartmentId });
      return reviews;
    } catch (e) {
      throw new Error(`Error getting apartment reviews: ${e}`);
    }
  }

  async createApartmentReview(CreateApartmentReviewInput: any, userId: Types.ObjectId) {
    try {
      const _apartment = await this.models.Apartment.find({
        _id: CreateApartmentReviewInput.apartment,
      });

      if (!_apartment) {
        throw new Error('No apartment found');
      }

      const review = await this.models.ApartmentReview.create({
        user: userId,
        ...CreateApartmentReviewInput,
      });

      return review;
    } catch (e) {
      throw new Error(`Error creating review for apartment: ${e}`);
    }
  }

  async deleteApartmentReview(DeleteApartmentReviewInput: { id: Types.ObjectId }, userId:any) {
    try {
      const { id } = DeleteApartmentReviewInput;

      const review = await this.models.ApartmentReview.findById(id);

      if (!review || review.user.toString() !== userId) {
        throw new Error(`No review found`);
      }

      await this.models.ApartmentReview.findByIdAndDelete(id);

      return 'Deleted review successfully';
    } catch (e) {
      throw new Error(`Error deleting review: ${e}`);
    }
  }
}
