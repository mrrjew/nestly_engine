import { model,Schema } from "mongoose";

const imageSchema = new Schema({
    url: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true } // User or Apartment
  }, { timestamps: true });

  const ApartmentImage = model('image', imageSchema)
  export default ApartmentImage