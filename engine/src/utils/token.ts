import jwt from 'jsonwebtoken';
import config from '../config';
import { Types } from 'mongoose';

const AccesskeyName = { ...config.auth };

export function signJwt(
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(AccesskeyName[`${keyName}`], 'base64').toString('ascii');

  return jwt.sign(object, signingKey, {
    ...(options && options),
  });
}

export function verifyJwt<T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
  const publicKey = Buffer.from(AccesskeyName[`${keyName}`], 'base64').toString('ascii');

  try {
    console.log(token);
    const decoded = jwt.verify(token, publicKey) as T;
    console.log(decoded);
    return decoded;
  } catch (e) {
    throw new Error('Token verification failed');
  }
}
