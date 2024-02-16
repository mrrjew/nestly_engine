import IService, { IAppContext } from '../../types/app';
import { IUserSettingsDocument } from '../../types/user/settings';

export default class UserSettingsService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async getUserSettings(userId: any) {
    console.log(userId)
    try {
      const settings = await this.models.UserSettings.findOne({userId});
      return settings;
    } catch (e) {
      throw new Error(`Error getting user settings: ${e}`);
    }
  }

  async updateUserSettings(UpdateUserSettingsInput: Partial<IUserSettingsDocument>, userId: any) {
    try {
      const updatedSettings = await this.models.UserSettings.findOneAndUpdate(
        {userId},
        { $set: { userId,...UpdateUserSettingsInput } },
        { new: true, upsert: true }
      );
      await updatedSettings.save();
      return updatedSettings;
    } catch (e) {
      throw new Error(`Error updating settings: ${e}`);
    }
  }
}
