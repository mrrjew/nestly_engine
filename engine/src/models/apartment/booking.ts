import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    apartment: { type: Schema.Types.ObjectId, ref: 'apartment', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['CONFIRMED', 'PENDING', 'CANCELED'], default: 'PENDING' },
    notes: String,
  },
  { timestamps: true }
);


const ApartmentBooking = mongoose.model('booking', bookingSchema);
export default ApartmentBooking