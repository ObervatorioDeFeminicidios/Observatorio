import { env } from '@/config/env';
import mysql from 'serverless-mysql';

export const conn = mysql({
  config: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
  },
});
