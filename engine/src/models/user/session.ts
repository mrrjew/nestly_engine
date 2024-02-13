import { Schema, model,CallbackError} from "mongoose";
import { IUserSessionDocument, IUserSessionModel } from "../../types/user/session";

const sessionSchema = new Schema<IUserSessionDocument>({
    userId: {type: Schema.Types.ObjectId, ref:"User", required:true},
    valid: {type: Boolean, required:true, default:true}
})

const Session = model("Session",sessionSchema)

export default Session