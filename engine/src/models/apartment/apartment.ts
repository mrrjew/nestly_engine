import { Schema, model } from 'mongoose';
import { IApartmentDocument} from '../../types/apartment/apartment';

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
      {url: { type: String}}
    ],
  },
  { timestamps: true }
);

const Apartment = model<IApartmentDocument>('apartment', apartmentSchema);
export default Apartment;
