import { Model, Types, Document } from 'mongoose';

export interface IUserSession {
  userId: Types.ObjectId
  valid: boolean
}

export interface IUserSessionDocument extends IUserSession {
    createdAt: Date
    updatedAt: Date
}

export interface IUserSessionModel extends Model<IUserSessionDocument>{}
