import { Types,Document } from "mongoose"

export interface IApartmentBooking {
    user: Types.ObjectId
    apartment: Types.ObjectId
    startDate: Date,
    endDate: Date,
    status: 'CONFIRMED' | 'PENDING' | 'CANCELED'
    notes: string
  }
  
  export interface IApartmentBookingInput {
    user: Types.ObjectId
    apartment: Types.ObjectId
    startDate: Date,
    endDate: Date,
    status: string
    notes: string
  }

  export interface IApartmentBookingDocument extends IApartmentBooking{
    _id:Types.ObjectId,
    createdAt:Date,
    updatedAt:Date
  }