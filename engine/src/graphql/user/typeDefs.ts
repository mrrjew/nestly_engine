import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    user: VerifiedUser
    getUserProfile: UserProfile
    getUsersByType:[UserGroup]
    getRecentUsers:[VerifiedUser]
    getAllUsers:[UnVerifiedUser]
    getAllVerifiedUsers:[VerifiedUser]
    getOverallUserRating: UserAllRating
    getAllUserSettings: UserSettings
  }

  type VerifiedUser @key(fields: _id) {
    _id: ID!
    username: String!
    email: String!
    password: String!
    type: Type!
    verificationCode: String!
    verified: Boolean,
    profile: UserProfile,
    settings: UserSettings,
    rating: UserAllRating
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

  type UserGroup {
    _id:String
    users:[VerifiedUser]
  }

  type UserSession {
    accessToken: String!
    refreshToken: String!
  }

  type RefreshToken {
    accessToken: String!
  }

  type UserProfile {
    _id: ID!
    userId: ID!
    firstname: String!
    lastname: String!
    phoneInt: String!
    address: String!
  }

  type UserRating {
    userId: ID!
    ratedBy: ID!
    criteria: String!
    score: Int!
    comment: String
  }

  type UserAllRating {
    averageRating: Int
    totalRatings: Int
  }

  type UserSettings {
    # General Settings
    userId: ID!
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

  enum Language {
    EN
    FR
    ES
    DE
    ZH
    JA
    KO
  }

  enum Theme {
    LIGHT
    DARK
  }

  enum Visibility {
    PUBLIC
    PRIVATE
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
    phoneInt: String!
    address: String!
  }

  input UpdateUserProfileInput {
    firstname: String
    lastname: String
    phoneInt: String
    address: String
  }

  input CreateUserRatingInput {
    ratedBy: ID!
    criteria: String!
    score: Int!
    comment: String
  }

  input UpdateUserSettingsInput {
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
    createUserProfile(CreateUserProfileInput: CreateUserProfileInput!): UserProfile
    updateUserProfile(UpdateUserProfileInput: UpdateUserProfileInput!): String

    #user rating mutations
    createUserRating(CreateUserRatingInput: CreateUserRatingInput!): UserRating

    #user settings mutations
    updateUserSettings(UpdateUserSettingsInput: UpdateUserSettingsInput!): UserSettings
  }
`;

export default typeDefs;
