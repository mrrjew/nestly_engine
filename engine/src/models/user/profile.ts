import mongoose, {model} from "mongoose"
import { IUserProfile, IUserProfileDocument, IUserProfileModel } from "../../types/user/profile";

const userProfileSchema = new mongoose.Schema<IUserProfile>({
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true}
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
  });

const UserProfile = model<IUserProfileDocument,IUserProfileModel>("Profile", userProfileSchema)
export default UserProfile
  