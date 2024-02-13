import { Model, Types, Document } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  type: 'OWNER' | 'AGENT' | 'RENTER';
  verificationCode: string;
  passwordResetCode?: string;
  verified: boolean;
}

export interface IUserAuth {
  user: IUser;
}

export interface IUserInput {
  username: string;
  email: string;
  password: string;
  type: string;
  verified: boolean;
}

export interface IUserVerificationInput {
  id: Types.ObjectId;
  verificationCode: string;
}

export interface IUserResetPasswordInput {
  id: Types.ObjectId;
  passwordResetCode: string
  newPassword: string
}


export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  validatePassword(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserDocument> {}
