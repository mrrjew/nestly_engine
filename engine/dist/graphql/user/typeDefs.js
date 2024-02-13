"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefs = (0, graphql_tag_1.gql) `
    Query user {
        user: VerifiedUser
    }

  type VerifiedUser @key(fields: _id){
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verificationCode: String!
    passwordResetCode: String
    verified: boolean
  }

  type UnVerifiedUser @key(fields: _id){
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    passwordResetCode: String
    verified: boolean
  }

  enum Type{
    OWNER 
    AGENT
    RENTER
  }

  input createUnVerifiedUserInput {
    username: String!
    email: String!
    password: String!
    type: Type!
    passwordResetCode: String
    verified: boolean
  }

  Mutation {
    createUser(input: CreateUnverifiedUserInput!):UnverifiedUser
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map