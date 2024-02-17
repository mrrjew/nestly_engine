import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
    notes: String,
  },
  { timestamps: true }
);


const ApartmentBooking = mongoose.model('booking', bookingSchema);
export default ApartmentBooking