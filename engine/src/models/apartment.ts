import { Schema, model } from 'mongoose';
import { IApartmentDocument} from '../types/apartment';

const apartmentSchema = new Schema<IApartmentDocument>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [String],
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    reviews: [{
      rating: { type: Number, min:0,max:5 },
      comment: String,
    }],
    images: [
      {
        useId: { type: Schema.Types.ObjectId},
        filename: {type:String, required:true},
        path: {type:String, required:true}
      }
    ],
  },
  { timestamps: true }
);

const Apartment = model<IApartmentDocument>('apartment', apartmentSchema);
export default Apartment;
