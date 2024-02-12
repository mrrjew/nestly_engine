    
import jwt from "jsonwebtoken";
import config from "../config";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();

export const _generateToken = (id:Types.ObjectId) => {
  try {
    const token = jwt.sign({ id}, config.auth.secret, {
      expiresIn: config.auth.token_expiry,
    });
    return token;
  } catch (e) {
    throw e;
  }
};
export const verifyAccessToken = (token: string) => {
  console.log(token)
  try {
    if (!token) {
      throw new GraphQLError("No token", {
        extensions: {
          code: "UNAUTHENTICATED - NO TOKEN",
        },
      });
    }

    let decoded;
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err: any, tokenData: any) {
        if (err) {
          throw new GraphQLError(err.message, {
            extensions: {
              code: "UNAUTHENTICATED - TOKEN MALFORMED",
            },
          });
        }
        decoded = tokenData;
      }
    );

    return decoded;
  } catch (err:any) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};