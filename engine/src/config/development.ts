import dotenv from 'dotenv';
dotenv.config();
import { Config } from '.';

const config: Config = {
  app: {
    name: 'nestly',
    port: 800,
    env: 'development',
  },
  auth: {
    accessTokenPrivateKey : process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey : process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey : process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey : process.env.REFRESH_TOKEN_PUBLIC_KEY,
},
  db: {
    uri: process.env.DEV_MONGO_URI || '',
  },
  smtp: {
    user: process.env.DEV_MAIL_USER,
    pass: process.env.DEV_MAIL_PASS,
    host: process.env.DEV_MAIL_HOST,
    port: process.env.DEV_MAIL_PORT ,
    secure: process.env.DEV_MAIL_SECURE || false
  },
    logger: {
    level: process.env.LOGGER_LEVEL
  },
  base_url:{
    url:`http://localhost:800`
  }
  
};

export default config;
