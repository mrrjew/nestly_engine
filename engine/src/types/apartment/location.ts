import { Document } from "mongoose"

export interface IApartmentLocation {
        latitude?: Number
        longitude?:Number
        city: String,
        state: String,
        country: String
}

export interface IApartmentLocationDocument extends IApartmentLocation,Document {}