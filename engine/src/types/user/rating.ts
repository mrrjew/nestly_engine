import { Model, Types } from 'mongoose';

export interface IUserRating {
  userId: Types.ObjectId;
  rating: number;
  review: string;
}

export interface IUserRatingDocument extends IUserRating, Document{
  createdAt: Date;
  updatedAt: Date;
}

export interface IRatingModel extends Model<IUserRatingDocument>{}

