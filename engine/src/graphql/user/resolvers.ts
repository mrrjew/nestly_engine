import { GraphQLError } from 'graphql';
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
          const userId = context.user._id;

          const user = await appContext.models.User.findById(userId)
            
          if (!user) {
            throw new GraphQLError('User not found');
          }

          return user;
        } catch (e) {
          throw new GraphQLError(`Error getting user in graphql: ${e}`);
        }
      },
      getAllUsers: async function () {
        const allUsers = appContext.models.User.find().exec();
        return allUsers;
      },
      getAllVerifiedUsers: async function () {
        const verifiedUsers = appContext.models.User.find({ verified: true }).exec();
        return verifiedUsers;
      },

      getUsersByType: async function (_: any) {
        try {
          const groupedUsers = await appContext.models.User.aggregate([
            {
              $group: {
                _id: '$type',
                users: { $push: '$$ROOT' },
              },
            },
          ]);

          return groupedUsers;
        } catch (e) {
          throw new GraphQLError(`Error grouping users: ${e}`);
        }
      },
      getRecentUsers: async function (_: any) {
        try {
          const currentDate = new Date();

          const oneMonthAgo = new Date(currentDate);
          oneMonthAgo.setMonth(currentDate.getMonth() - 1);

          const recentUsers = await appContext.models.User.aggregate([
            {
              $match: {
                createdAt: { $gte: oneMonthAgo, $lte: currentDate },
              },
            },
          ]);
          return recentUsers;
        } catch (e) {
          throw new GraphQLError(`Error getting recently registered users`);
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
      loginUser: async function (_: any, args: any) {
        const user = await appContext.services.UserService.loginUser(args.LoginUserInput);
        return user;
      },
      deleteUser: async function (_: any, {}, context: any) {
        const res = await appContext.services.UserService.deleteUser(context.user._id);
        return res;
      },
      updateUser: async function(_:any,args:any, context: any){
        const user = await appContext.services.UserService.updateUser(args.UpdateUserInput,context.user._id)
        return user
      },
      createUserSession: async function (_: any, args: any) {
        const token = await appContext.services.UserSessionService.createUserSession(args.CreateUserSessionInput);
        return token;
      },
      refreshToken: async function (_: any, args: any) {
        const accessToken = await appContext.services.UserSessionService.refreshAccessToken(
          args.RefreshTokenInput.token
        );
        return accessToken;
      }
    },
  };
}
