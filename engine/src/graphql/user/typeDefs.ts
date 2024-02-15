import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    user: VerifiedUser
    getUserProfile: Profile
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

  type Profile {
    _id: ID!
    userId: ID!
    firstname: String!
    lastname: String!
    phoneNumber: String!
    address: String!
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
    verificationCode: String!
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
  
  input DeleteUserInput {
    id: String!
  }

  input CreateUserProfileInput {
    userId: ID!
    firstname: String!
    lastname: String!
    phoneNumber: String!
    address: String!
  }

  input UpdateUserProfileInput {
    firstname: String
    lastname: String
    phoneNumber: String
    address: String
  }

  type Mutation {
    #user auth mutations
    createUser(CreateUnverifiedUserInput: CreateUnverifiedUserInput!): UnVerifiedUser
    verifyUser(VerifyUserInput: VerifyUserInput!): Boolean!
    loginUser(LoginUserInput: LoginUserInput!): VerifiedUser!
    deleteUser(DeleteUserInput: DeleteUserInput!): String!
    createUserSession(CreateUserSessionInput: CreateUserSessionInput!): UserSession
    refreshToken(RefreshTokenInput: RefreshTokenInput!): RefreshToken!
    forgotPassword(ForgotPasswordInput: ForgotPasswordInput!): String!
    resetPassword(ResetPasswordInput: ResetPasswordInput!): String!

    #user profile mutations
    createUserProfile(CreateUserProfileInput: CreateUserProfileInput!): Profile
    updateUserProfile(UpdateUserProfileInput: UpdateUserProfileInput!): String
  }
`;

export default typeDefs;
