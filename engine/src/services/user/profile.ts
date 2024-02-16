import { StringExpressionOperatorReturningString } from 'mongoose';
import IService, { IAppContext } from '../../types/app';
import { IUserProfileInput } from '../../types/user/profile';

export default class UserProfileService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getUserProfile(userId: StringExpressionOperatorReturningString) {
    try {
      const userProfile = await this.models.UserProfile.findOne({ userId });

      return userProfile;
    } catch (e) {
      throw new Error(`Error finding user profile: ${e}`);
    }
  }

  async createUserProfile(CreateUserProfileInput: IUserProfileInput, userId: string) {
    try {
      const _userProfile = await this.models.UserProfile.findOne({ userId });

      if (_userProfile) {
        throw new Error('Profile already exists');
      }

      const userProfile = await this.models.UserProfile.create({
        userId,
        ...CreateUserProfileInput,
      });

      return userProfile;
    } catch (e) {
      throw new Error(`Error creating user profile`);
    }
  }

  async updateUserProfile(UpdateUserProfileInput:IUserProfileInput, userId: string) {
    const _userProfile = await this.models.UserProfile.findOne({ userId });

    if (!_userProfile) {
      throw new Error('Profile already exists');
    }
    try {
      await _userProfile.updateOne(
        { $set: { ...UpdateUserProfileInput } },
        { new: true, upsert: true }
      );

      return "User updated successfully";
    } catch (e) {
      throw new Error('Could not update user profile');
    }
  }
}
