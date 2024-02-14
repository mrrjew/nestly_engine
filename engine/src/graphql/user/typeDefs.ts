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
    accessToken: String!
    refreshToken: String!
  }

  type RefreshToken {
    accessToken: String!
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
    email: String!
  }

  input ResetPasswordInput {
    id: ID!
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

  input RefreshTokenInput {
    token: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(CreateUnverifiedUserInput: CreateUnverifiedUserInput!): UnVerifiedUser
    verifyUser(VerifyUserInput: VerifyUserInput!): Boolean
    loginUser(LoginUserInput: LoginUserInput!): VerifiedUser
    createUserSession(CreateUserSessionInput: CreateUserSessionInput!): UserSession
    refreshToken(RefreshTokenInput: RefreshTokenInput!): RefreshToken
    forgotPassword(ForgotPasswordInput: ForgotPasswordInput): String
    resetPassword(ResetPasswordInput: ResetPasswordInput): String
  }
`;

export default typeDefs;
