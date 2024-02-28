import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    user: VerifiedUser
    getUsersByType: [UserGroup]
    getRecentUsers: [VerifiedUser]
    getAllUsers: [UnVerifiedUser]
    getAllVerifiedUsers: [VerifiedUser]
  }

  type OwnerPaymentDetails {
    accountNumber:String!
    bankCode:String!
  }

  type VerifiedUser @key(fields: _id) {
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verificationCode: String!
    verified: Boolean
    profile: UserProfile
    rating: [UserRating]
    settings: UserSettings
    ownerPayment:OwnerPaymentDetails
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
    RENTER
  }

  type UserGroup {
    _id: String
    users: [VerifiedUser]
  }

  type UserSession {
    accessToken: String!
    refreshToken: String!
  }

  type RefreshToken {
    accessToken: String!
  }

  type UserProfile {
    avatar:String
    firstname: String!
    lastname: String!
    phoneNumber: String!
    address: String!
  }

  type UserRating {
    ratedBy: ID!
    criteria: String!
    score: Int!
    comment: String
  }

  type UserSettings {
    # General Settings
    language: Language
    theme: Theme
    notificationEnabled: Boolean
    soundEnabled: Boolean
    autoSaveInterval: Int

    # Privacy Settings
    profileVisibility: Visibility
    contactInfoVisibility: Visibility
    locationSharingEnabled: Boolean
    activityTrackingEnabled: Boolean
    dataSharingEnabled: Boolean
    dataRetentionPeriod: Int # in days
    # Security Settings
    twoFactorAuthEnabled: Boolean
    dataEncryptionEnabled: Boolean
  }

  enum Visibility {
    PUBLIC
    PRIVATE
  }

  enum Theme {
    LIGHT
    DARK
  }

  enum Language {
    EN
    FR
    ES
    DE
    ZH
    JA
    KO
  }

  input UserProfileInput {
    avatar:String
    firstname: String!
    lastname: String!
    phoneNumber: String!
    address: String!
  }

  input UserRatingInput {
    ratedBy: ID!
    criteria: String!
    score: Int!
    comment: String
  }

  input UserSettingsInput {
    # General Settings
    language: Language
    theme: Theme
    notificationEnabled: Boolean
    soundEnabled: Boolean
    autoSaveInterval: Int

    # Privacy Settings
    profileVisibility: Visibility
    contactInfoVisibility: Visibility
    locationSharingEnabled: Boolean
    activityTrackingEnabled: Boolean
    dataSharingEnabled: Boolean
    dataRetentionPeriod: Int # in days
    # Security Settings
    twoFactorAuthEnabled: Boolean
    dataEncryptionEnabled: Boolean
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
    email: String!
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

  input OwnerPaymentDetailsInput {
    accountNumber:String!
    bankCode:String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
    type: Type
    verificationCode: String
    verified: Boolean
    profile: UserProfileInput
    rating: [UserRatingInput]
    settings: UserSettingsInput
    ownerPayment:OwnerPaymentDetailsInput
  }

  extend type Mutation {
    #user auth mutations
    createUser(CreateUnverifiedUserInput: CreateUnverifiedUserInput!): UnVerifiedUser
    verifyUser(VerifyUserInput: VerifyUserInput!): Boolean!
    loginUser(LoginUserInput: LoginUserInput!): VerifiedUser!
    deleteUser(DeleteUserInput: DeleteUserInput!): String!
    createUserSession(CreateUserSessionInput: CreateUserSessionInput!): UserSession
    refreshToken(RefreshTokenInput: RefreshTokenInput!): RefreshToken!
    forgotPassword(ForgotPasswordInput: ForgotPasswordInput!): String!
    resetPassword(ResetPasswordInput: ResetPasswordInput!): String!
    updateUser(UpdateUserInput: UpdateUserInput!): VerifiedUser
  }
`;

export default typeDefs;
