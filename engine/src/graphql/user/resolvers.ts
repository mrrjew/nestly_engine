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
          const user = await appContext.models.User.findOne(context.user._id);

          return user;
        } catch (err) {
          throw new Error('Eror getting user in graphql');
        }
      },
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

      createUserSession: async function (_: any, args: any) {
        const token = await appContext.services.UserSessionService.createUserSession(args.CreateUserSessionInput);
        return token
      },
      // refreshToken: async function(_: any, args:any) {
      //   const accessToken = await appContext.services.UserSessionService.refreshAccessToken(args.RefreshTokenInput.token);
      //   return accessToken;
      // }
      
    },
  };
}
