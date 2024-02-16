import { Model, Types } from 'mongoose';

export interface IUserRating {
  userId: Types.ObjectId;
  ratedBy: Types.ObjectId;
  criteria: string;
  score: number;
  comment?: string;
}

export interface IUserRatingDocument extends IUserRating, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRatingModel extends Model<IUserRatingDocument> {}
