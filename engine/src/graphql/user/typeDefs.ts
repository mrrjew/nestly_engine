import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    user: VerifiedUser
  }

  type VerifiedUser @key(fields: _id) {
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verificationCode: String!
    verified: Boolean
  }

  type UnVerifiedUser @key(fields: _id) {
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verified: Boolean
  }

  enum Type {
    OWNER
    AGENT
    RENTER
  }

  input CreateUnverifiedUserInput {
    username: String!
    email: String!
    password: String!
    type: Type!
    verified: Boolean
  }

  input VerifyUserInput {
    id: ID!
    verificationCode: String
  }

  input ForgotPasswordInput {
    email :String!
  }

  type Mutation {
    createUser($CreateUnverifiedUserInput: CreateUnverifiedUserInput!): UnVerifiedUser
    verifyUser($VerifyUserInput: VerifyUserInput!): Boolean
    forgotPassword($ForgotPasswordInput: ForgotPasswordInput): String
  }
`;

export default typeDefs;
