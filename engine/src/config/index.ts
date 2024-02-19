import dotenv from 'dotenv';
import development from './development';
import production from './production';

export interface Config {
  app: {
    name: string;
    env: 'production' | 'development' | 'test';
    port: string | number;
  };

  db: {
    uri: string;
  };
  auth: {
    accessTokenPrivateKey : string
    accessTokenPublicKey : string
    refreshTokenPrivateKey : string
    refreshTokenPublicKey : string
};
  smtp: {
    user: string;
    pass: string;
    host: string;
    port: string;
    secure: boolean | string;
  };
  logger: {
    level: string;
  };
  base_url : {
    url: string
  }
}

const config = process.env.NODE_ENV === 'development' ? development : production;

export default config;
