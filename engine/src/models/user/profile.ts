import mongoose, {model} from "mongoose"
import { IUserProfile, IUserProfileDocument, IUserProfileModel } from "../../types/user/profile";

const userProfileSchema = new mongoose.Schema<IUserProfile>({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  });

const UserProfile = model<IUserProfileDocument,IUserProfileModel>("profile", userProfileSchema)
export default UserProfile
  