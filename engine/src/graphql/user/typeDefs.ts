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
  
  type UserSession {
    accessToken : String!
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

  input ResetPasswordInput {
    id:ID!
    passwordResetCode: String!
    newPassword: String!
  }

  input CreateUserSessionInput {
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verified: Boolean
  }
  
  type Mutation {
    createUser(CreateUnverifiedUserInput: CreateUnverifiedUserInput!): UnVerifiedUser
    verifyUser(VerifyUserInput: VerifyUserInput!): Boolean
    createUserSession(CreateUserSessionInput: CreateUserSessionInput!): UserSession
    forgotPassword(ForgotPasswordInput: ForgotPasswordInput): String
    resetPassword(ResetPasswordInput: ResetPasswordInput): String
  }
`;

export default typeDefs;
