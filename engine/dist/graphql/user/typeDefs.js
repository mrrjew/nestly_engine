"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const typeDefs = (0, graphql_tag_1.gql) `
    Query user {
        user: User
    }

  type User {
    username: String!
    email: String!
    password: String!
    profile: UserProfile
    type: Type
  }

  enum Type{
    OWNER 
    AGENT
    RENTER
  }

  type UserProfile {
    firstname: String!
    lastname: String!
    phoneNumber: Int!
    address: String!
  }

  input createUserInput {
    username: String!
    email: String!
    password: String!
    profile: UserProfile
  }

  Mutation {
    createUser(input: CreateUserInput!):User
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map