import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    getApartmentBooking(GetApartmentBookingInput: GetApartmentBookingInput!): [AllApartmentBookings]
  }

  type AllApartmentBookings {
    _id: String
    bookings: [ApartmentBooking]
  }

  enum BookingStatus {
    CONFIRMED
    PENDING
    CANCELED
  }

  type ApartmentBooking {
    apartment: ID
    startDate: Date
    transactionId: String
    reference:String
    endDate: Date
    status: BookingStatus
    notes: String
  }

  input BookingPaginationInput {
    limit: Int!
    offset: Int!
  }

  input GetApartmentBookingInput {
    apartment: ID!
    pagination: BookingPaginationInput!
  }

  input CreateApartmentBookingInput {
    apartment: ID!
    transactionId: String
    reference:String
    startDate: Date!
    endDate: Date!
    status: BookingStatus
    notes: String
  }

  input UpdateApartmentBookingInput {
    bookingId: ID!
    transactionId: String
    reference:String
    startDate: Date
    endDate: Date
    status: BookingStatus
    notes: String
  }

  input DeleteApartmentBookingInput {
    bookingId: ID!
  }

  extend type Mutation {
    createApartmentBooking(CreateApartmentBookingInput: CreateApartmentBookingInput!): ApartmentBooking
    updateApartmentBooking(UpdateApartmentBookingInput: UpdateApartmentBookingInput!): ApartmentBooking
    deleteApartmentBooking(DeleteApartmentBookingInput: DeleteApartmentBookingInput!): String
  }
`;

export default typeDefs;
