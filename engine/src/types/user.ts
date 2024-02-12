import { Model, Types, Document } from 'mongoose';

export interface IUserProfile {
  firstname: string;
  lastname: string;
  phoneNumber: number;
  address: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  profile?: IUserProfile;
  type: 'OWNER' | 'AGENT' | 'RENTER';
}

export interface IUserAuth {
  user: IUser;
  token: string;
}

export interface IUserInput {
  username: string;
  email: string;
  password: string;
  profile?: IUserProfile;
  type: string;
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  validatePasswords(): string | number;
  resetPassword?(): string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserSchema> {}