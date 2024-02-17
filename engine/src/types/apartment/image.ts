import { Types } from "mongoose"

export interface IApartmentImage {
        url: string
        apartment: Types.ObjectId
}

export interface IApartmentImageDocument extends IApartmentImage {
    _id:Types.ObjectId
    createdAt:Date
    updatedAt:Date
}