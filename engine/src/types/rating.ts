import { Model, Types } from 'mongoose';

export interface IRating {
  rating: number;
  review: string;
}

export interface IRatingSchema extends IRating{
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRatingModel extends Model<IRatingSchema>{}

