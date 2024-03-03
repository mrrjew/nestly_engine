"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefs = (0, graphql_tag_1.gql) `
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
  
  type UserSession {
    accessToken : String!
    refreshToken: String!
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

  input ResetPasswordInput {
    id:ID!
    passwordResetCode: String!
    newPassword: String!
  }

  input CreateUserSessionInput @key(fields: _id) {
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
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map