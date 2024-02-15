import { profile } from 'console';
import { IAppContext } from '../../types/app';
export default function (appContext: IAppContext) {
  return {
    User: {
      __resolveReference: async function (_: any, args: any) {
        return await appContext.models.User.findById(_._id);
      },
    },

    Query: {
      user: async function (_: any, {}, context: any) {
        try {
          const user = await appContext.models.User.findById(context.user._id);

          return user;
        } catch (e) {
          throw new Error(`Error getting user in graphql: ${e}`);
        }
      },

      getUserProfile: async function(_:any,{},context:any){
        try{
          const profile = await appContext.models.UserProfile.findOne({userId:context.user._id})
          return profile
        }catch(e){
          throw new Error(`Error getting user profile: ${e}`)
        }
      }
    },

    Mutation: {
      createUser: async function (_: any, args: any) {
        const { user } = await appContext.services.UserService.registerUser(args.CreateUnverifiedUserInput);
        return user;
      },

      verifyUser: async function (_: any, args: any) {
        const verified = await appContext.services.UserService.verifyUser(args.VerifyUserInput);
        return verified;
      },

      forgotPassword: async function (_: any, args: any) {
        const forgotPassword = await appContext.services.UserService.forgotPassword(args.ForgotPasswordInput);
        return forgotPassword;
      },
      
      resetPassword: async function (_: any, args: any) {
        const resetPassword = await appContext.services.UserService.resetPassword(args.ResetPasswordInput);
        return resetPassword;
      },
      loginUser: async function(_:any,args:any) {
        const user = await appContext.services.UserService.loginUser(args.LoginUserInput)
        return user
      },
      deleteUser: async function(_:any,{},context:any){
        const res = await appContext.services.UserService.deleteUser(context.user._id)
        return res
      },
      createUserSession: async function (_: any, args: any) {
        const token = await appContext.services.UserSessionService.createUserSession(args.CreateUserSessionInput);
        return token
      },
      refreshToken: async function(_: any, args:any) {
        const accessToken = await appContext.services.UserSessionService.refreshAccessToken(args.RefreshTokenInput.token);
        return accessToken;
      },
      createUserProfile: async function(_:any, args:any,context:any){
        const profile = await appContext.services.UserProfile.createUserProfile(
          args.CreateUserProfileInput,context.user._id
        )
        return profile
      },
      updateUserProfile: async function(_:any,args:any,context:any){
        const message = await appContext.services.UserProfile.updateUserProfile(
          args.UpdateUserProfileInput,context.user._id
        )
        return message
      },
    },
  };
}
