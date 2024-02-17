import mongoose, { Schema } from 'mongoose';
import { IApartmentReviewDocument, IApartmentReviewModel } from '../../types/apartment/review';

const reviewSchema = new Schema<IApartmentReviewDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment', required: true },
    rating: { type: Number, required: true },
    comment: String,
  },
  { timestamps: true }
);

const ApartmentReview = mongoose.model('Review', reviewSchema);
export default ApartmentReview;
