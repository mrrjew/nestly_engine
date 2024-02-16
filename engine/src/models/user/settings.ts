import mongoose from "mongoose";
import { IUserSettingsDocument, IUserSettingsModel } from "../../types/user/settings";

const settingsSchema = new mongoose.Schema<IUserSettingsDocument>({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    // General Settings
    language: { type: String, enum: ['EN' , 'FR' , 'ES' , 'DE' , 'ZH' , 'JA' , 'KO'], default: 'EN' },
    theme: { type: String,enum:['LIGHT','DARK'], default: 'LIGHT' },
    notificationEnabled: { type: Boolean, default: true },
    soundEnabled: { type: Boolean, default: true },
    autoSaveInterval: { type: Number, default: 10 },

    // Privacy Settings
    profileVisibility: { type: String, enum: ['PUBLIC', 'PRIVATE'], default: 'PUBLIC' },
    contactInfoVisibility: { type: String, enum: ['PUBLIC', 'PRIVATE'], default: 'PUBLIC' },
    locationSharingEnabled: { type: Boolean, default: true },
    activityTrackingEnabled: { type: Boolean, default: true },
    dataSharingEnabled: { type: Boolean, default: true },
    dataRetentionPeriod: { type: Number, default: 365 }, 

    // Security Settings
    twoFactorAuthEnabled: { type: Boolean, default: false },
    dataEncryptionEnabled: { type: Boolean, default: false },
});

const UserSettings = mongoose.model<IUserSettingsModel>('settings', settingsSchema);
export default UserSettings;