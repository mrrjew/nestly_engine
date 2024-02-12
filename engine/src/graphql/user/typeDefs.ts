import { gql } from 'graphql-tag';

const typeDefs = gql`
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

export default typeDefs
