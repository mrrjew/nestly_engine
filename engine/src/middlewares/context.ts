import { IUser } from "../types/user/user";
import { verifyJwt } from "../utils/token";

export const setContext = async ({ req }) => {

  try {

   return {req}

  } catch (err) {

    console.log(err);

  }
};