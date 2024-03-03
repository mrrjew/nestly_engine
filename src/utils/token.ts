import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = process.env.JWT_PRIVATE_KEY
const publicKey = process.env.JWT_PUBLIC_KEY

export function signJwt(object: object, options?: jwt.SignOptions): string {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string): T {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    // Optionally handle or log the error
    throw e;
  }
}
