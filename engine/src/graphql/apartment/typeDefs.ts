import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    getAllOwnerApartments: [Apartment]
    getAllApartments(GetAllApartmentsInput: GetAllApartmentsInput): [Apartment]
    getAllApartmentReviews(GetAllApartmentReviewsInput:GetAllApartmentReviewsInput!):[ApartmentReview]
    getAllApartmentBookings(GetAllApartmentBookingsInput:GetAllApartmentBookingsInput!): [ApartmentBooking]
  }

  type Apartment {
    _id: ID!
    owner: ID!
    name: String!
    description: String!
    location: String!
    bedrooms: Int!
    bathrooms: Int!
    amenities: [String]!
    price: Float!
    available: Boolean!
    images: [ID]!
  }

  type ApartmentReview {
    _id: ID!
    user: ID!
    apartment: ID!
    rating: Int!
    comment: String!
  }

  type ApartmentBooking {
    _id:ID!
    user:ID!
    apartment:ID!
    startDate: Date!
    endDate: Date!

  }

  input GetAllApartmentReviewsInput {
    apartmentId:ID!
  }

  input GetAllApartmentBookingsInput {
    apartmentId: ID!
  }

  input FilterOperatorsIntInput {
    ne: Int
    gt: Int
    eq: Int
    gte: Int
    lt: Int
    lte: Int
  }

  input FiltersInput {
    bedrooms: FilterOperatorsIntInput
    bathrooms: FilterOperatorsIntInput
    price: FilterOperatorsIntInput
  }

  input SortInput {
    price: Int
    bedrooms: Int
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  input GetAllApartmentsInput {
    filters: FiltersInput
    sort: SortInput
    pagination: PaginationInput
    search: String
  }

  input UpdateApartmentInput {
    name: String
    description: String
    location: String
    bedrooms: Int
    bathrooms: Int
    amenities: [String]
    price: Float
    available: Boolean
    images: [ID]
  }

  input CreateApartmentInput {
    name: String!
    description: String!
    location: String!
    bedrooms: Int!
    bathrooms: Int!
    amenities: [String]!
    price: Float!
    available: Boolean!
    images: [ID]!
  }

  input DeleteApartmentInput {
    id: ID!
  }

  input CreateApartmentReviewInput {
    apartment: ID!
    rating: Int!
    comment: String!
  } 

  input DeleteApartmentReviewInput {
    id:ID!
  }

  input CreateApartmentBookingInput {
    apartment:ID!
    startDate:Date!
    endDate:Date!
    status: BookingStatus!
  }

  enum BookingStatus {
    CONFIRMED
    PENDING
    CANCELED
  }
  scalar Upload
  scalar Date

  extend type Mutation {
    createApartment(CreateApartmentInput: CreateApartmentInput!): Apartment
    updateApartment(UpdateApartmentInput: UpdateApartmentInput!): Apartment
    deleteApartment(DeleteApartmentInput: DeleteApartmentInput!): String
    uploadImages(UploadImageInput: Upload!): String!
    createApartmentReview(CreateApartmentReviewInput: CreateApartmentReviewInput!): ApartmentReview
    deleteApartmentReview(DeleteApartmentReviewInput: DeleteApartmentReviewInput!): String
    createApartmentBooking(CreateApartmentBookingInput: CreateApartmentBookingInput!):ApartmentBooking
    }
`;

export default typeDefs;
