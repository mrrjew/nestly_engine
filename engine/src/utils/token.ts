import jwt from 'jsonwebtoken';
import config from '../config';
import { Types } from 'mongoose';

const AccesskeyName = { ...config.auth };

export function signJwt(
  id: Types.ObjectId,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(AccesskeyName[`${keyName}`], 'base64').toString('ascii');

  return jwt.sign({ id }, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null{
  const publicKey = Buffer.from(AccesskeyName[`${keyName}`],"base64").toString("ascii")

  try{
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded
  }catch(e){
    throw new Error("Token verification failed")
  }
};
