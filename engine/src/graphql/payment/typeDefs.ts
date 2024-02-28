import gql from "graphql-tag";

const typeDefs = gql`
    scalar JSON

    input InitiateTransactionInput {
        email:String!
        amount:String!
        currency:String
        channels:JSON
        reference:String!
        callback_url:String!
        metadata:JSON!
    }

    type Mutation {
        initiateTransaction(InitiateTransactionInput:InitiateTransactionInput!): JSON
        verifyTransaction(Reference: String!): JSON
        makePaymentToOwner(bookingId:ID!):JSON
    }
`

export default typeDefs