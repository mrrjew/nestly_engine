import { Model, Types, Document } from 'mongoose';

export interface IUserProfile {
  userId: Types.ObjectId;
  firstname: string;
  lastname: string;
  phoneNumber: number;
  address: string;
}

export interface IUserProfileDocument extends IUserProfile, Document {
  createdAt: Date;
  updatedAT: Date
}

export interface IUserProfileModel extends Model<IUserProfileDocument> {}
