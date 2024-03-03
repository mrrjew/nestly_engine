import { Schema, model } from "mongoose";
import { IApartmentBookingDocument } from "../types/booking";


const bookingSchema = new Schema<IApartmentBookingDocument>({
    user:{type: Schema.Types.ObjectId,ref:"user",required:true},
    apartment:{type:Schema.Types.ObjectId,ref:"apartment",required:true},
    transactionId:{type:String},
    reference:{type:String},
    amount:{type:String},
    startDate: { type: Date},
    endDate: { type: Date},
    status: { type: String, enum: ['CONFIRMED', 'PENDING', 'CANCELED'], default: 'PENDING' },
    notes: String,
  })

const ApartmentBooking = model('apartment_booking',bookingSchema)
export default ApartmentBooking