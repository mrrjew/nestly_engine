import { model,Schema } from "mongoose";
import { IApartmentLocationDocument } from "../../types/apartment/location";

const locationSchema = new Schema<IApartmentLocationDocument>({
    latitude: { type: Number},
    longitude: { type: Number},
    city: String,
    state: String,
    country: String
  });

  const ApartmentLocation = model('user',locationSchema)
  export default ApartmentLocation