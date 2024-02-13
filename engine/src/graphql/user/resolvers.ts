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
      createuser: async function (_: any, args: any, context: any) {
        const { user, token } = await appContext.services.UserService.registerUser(args.inputs);

        return {user,token};
      },
    },
  };
}
