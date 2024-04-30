import { Schema, model, CallbackError } from 'mongoose';
import { IUserDocument } from '../../types/user/user';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const privateField = ['password', '__v', 'verificationCode', 'passwordResetCode', 'verified'];

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String},
    password: { type: String, required: true },
    type: { type: String, enum: ['OWNER','RENTER'], required: true },
    verificationCode: { type: String, required: true, default: () => v4() },
    passwordResetCode: { type: String },
    verified: { type: Boolean, required: true, default: false },
    profile: {
      avatar: {type:String},
      firstname: { type: String },
      lastname: { type: String },
      address: { type: String },
    },
    rating: [{
      ratedBy: { type: Schema.Types.ObjectId }, // User who is giving the rating
      criteria: { type: String }, // Criteria for the rating (e.g., professionalism, communication)
      score: { type: Number, required: true, min: 1, max: 5 }, // Rating score (1 to 5)
      comment: { type: String }, // Optional comment
    }],
    settings: {
      // General Settings
      language: { type: String, enum: ['EN', 'FR', 'ES', 'DE', 'ZH', 'JA', 'KO'], default: 'EN' },
      theme: { type: String, enum: ['LIGHT', 'DARK'], default: 'LIGHT' },
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
    },
    ownerPayment: {
      accountNumber : {type:String},
      bankCode: {type:String}
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

const User = model('User', userSchema);

export default User;
