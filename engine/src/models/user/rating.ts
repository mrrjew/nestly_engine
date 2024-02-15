import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who is giving the rating
  ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User being rated
  criteria: { type: String, required: true }, // Criteria for the rating (e.g., professionalism, communication)
  score: { type: Number, required: true, min: 1, max: 5 }, // Rating score (1 to 5)
  comment: { type: String }, // Optional comment
});

const UserRating = mongoose.model('Rating', ratingSchema);

export default UserRating
