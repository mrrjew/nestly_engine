import mongoose from 'mongoose';
import { IUserRating } from '../../types/user/rating';

const ratingSchema = new mongoose.Schema<IUserRating>({
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // User who is giving the rating
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // User being rated
  criteria: { type: String, required: true }, // Criteria for the rating (e.g., professionalism, communication)
  score: { type: Number, required: true, min: 1, max: 5 }, // Rating score (1 to 5)
  comment: { type: String }, // Optional comment
}, {
  timestamps: true
});

const UserRating = mongoose.model('rating', ratingSchema);

export default UserRating
