import { Schema, model } from 'mongoose';
import { IApartmentDocument, IApartmentModel } from '../../types/apartment/apartment';

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
    images: [{ type: Schema.Types.ObjectId, ref:'image'}],
  },
  { timestamps: true }
);

const Apartment = model<IApartmentDocument>('apartment', apartmentSchema);
export default Apartment;
