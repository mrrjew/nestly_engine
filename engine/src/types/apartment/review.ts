import { Types, Model, Document } from 'mongoose';

export interface IApartmentReview {
  user: Types.ObjectId;
  apartment: Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IApartmentReviewDocument extends IApartmentReview,Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApartmentReviewModel extends Model<IApartmentReviewDocument> {}
