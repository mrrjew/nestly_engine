import gql from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    getAllOwnerApartments: [Apartment]
    getAllApartments(GetAllApartmentsInput: GetAllApartmentsInput): [Apartment]
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

  scalar Upload

  extend type Mutation {
    createApartment(CreateApartmentInput: CreateApartmentInput!): Apartment
    updateApartment(UpdateApartmentInput: UpdateApartmentInput!): Apartment
    deleteApartment(DeleteApartmentInput: DeleteApartmentInput!): String
    uploadImages(UploadImageInput: Upload!): String!
  }
`;

export default typeDefs;
