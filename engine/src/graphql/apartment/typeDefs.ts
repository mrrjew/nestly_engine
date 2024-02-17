import gql from 'graphql-tag'

const typeDefs = gql`
    extend type Query {
        getAllOwnerApartments : [Apartment]
    }


    type Apartment {
        owner: ID!
        name: String!
        description: String!
        location: String!
        bedrooms: Int!
        bathrooms: Int!
        amenities: [String]!
        price: Int!
        available: Boolean!
        images: [ID]!
    }

    input UpdateApartmentInput {
        name: String
        description: String
        location: String
        bedrooms: Int
        bathrooms: Int
        amenities: [String]
        price: Int
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
        price: Int!
        available: Boolean!
        images: [ID]!
    }

    extend type Mutation {
        createApartment(CreateApartmentInput: CreateApartmentInput!): Apartment
        updateApartment(UpdateApartmentInput: UpdateApartmentInput!): Apartment
    }
`

export default typeDefs