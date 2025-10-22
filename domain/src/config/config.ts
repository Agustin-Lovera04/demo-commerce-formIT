import dotenv from 'dotenv';

dotenv.config();

export const config = {
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT || 'default_secret',
};
