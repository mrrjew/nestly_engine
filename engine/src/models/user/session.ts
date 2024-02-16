import { Schema, model,CallbackError} from "mongoose";
import { IUserSessionDocument, IUserSessionModel } from "../../types/user/session";

const sessionSchema = new Schema<IUserSessionDocument>({
    userId: {type: Schema.Types.ObjectId, ref:"user", required:true},
    valid: {type: Boolean, required:true, default:true}
}, {
    timestamps: true
  })

const Session = model("session",sessionSchema)

export default Session