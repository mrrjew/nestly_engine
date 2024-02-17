import jwt from 'jsonwebtoken';
import fs from 'fs';

import path from 'path';

const privateKeyPath = path.resolve(__dirname, '../../privateKey.pem');
const publicKeyPath = path.resolve(__dirname, '../../publicKey.pem');

const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

export function signJwt(
  object: Object,
  options?: jwt.SignOptions | undefined
) {

  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm:'RS256'
  });
}

export function verifyJwt<T>(token: string): T | null {

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    throw new Error(e);
  }
}
