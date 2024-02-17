import IService, { IAppContext } from '../../types/app';
import { IUserRating } from '../../types/user/rating';

export default class UserRatingService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async createUserRating(createUserRatingInput: IUserRating) {
    try {
      const rating = await this.models.UserRating.create({createUserRatingInput});
      return rating;
    } catch (e) {
      throw new Error(`Could not rate user`);
    }
  }

  async getUserRating(userId: any) {
    try {
      const ratings = await this.models.UserRating.find({ userId });

      if (ratings.length === 0) {
        return {
          averageRating: 0,
          totalRatings: 0,
        };
      }

      const totalScore = ratings.reduce((sum: any, rating: any) => sum + rating.score, 0);
      const averageRating = totalScore / ratings.length;

      return {
        averageRating,
        totalRatings: ratings.length,
      };
    } catch (error) {
      console.error('Error fetching ratings for user:', error);
      throw new Error('Failed to fetch ratings');
    }
  }
}
