import mongoose from "mongoose";
import { IUserSchema,IUserProfile } from "../types/user";

// Define the user profile schema
const userProfileSchema = new mongoose.Schema<IUserProfile>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true }
});

// Define the user schema
const userSchema = new mongoose.Schema<IUserSchema>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: userProfileSchema},
  type: { type: String, enum: ['OWNER', 'AGENT', 'RENTER'], required: true }
});

// Create the Mongoose model for user
const User = mongoose.model('User', userSchema);

export default User;
