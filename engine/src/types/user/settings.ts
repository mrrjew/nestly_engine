import { Model,Document, Types } from "mongoose";

export interface IUserSettingsDocument extends Document {
    userId:Types.ObjectId
    // General Settings
    language : 'EN' | 'FR' | 'ES' | 'DE' | 'ZH' | 'JA' | 'KO';
    theme: 'LIGHT' | 'DARK'
    notificationEnabled: boolean;
    soundEnabled: boolean;
    autoSaveInterval: number;

    // Privacy Settings
    profileVisibility: 'PUBLIC' | 'PRIVATE';
    contactInfoVisibility: 'PUBLIC' | 'PRIVATE';
    locationSharingEnabled: boolean;
    activityTrackingEnabled: boolean;
    dataSharingEnabled: boolean;
    dataRetentionPeriod: number; // in days

    // Security Settings
    twoFactorAuthEnabled: boolean;
    dataEncryptionEnabled: boolean;
    createdAt:Date
    updatedAt:Date
}

export interface IUserSettingsModel extends Model<IUserSettingsDocument> {}