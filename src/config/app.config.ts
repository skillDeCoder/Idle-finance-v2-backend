import { registerAs } from '@nestjs/config';

export default registerAs('APP_CONFIG', () => ({
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: parseInt(process.env.PORT!, 10) || 9871,
  DATABASE_SYNC: process.env.NODE_ENV === 'production' ? false : true,
  RPC_URL: process.env.RPC_URL,
  AUTOMATION_BASE_URL: process.env.AUTOMATION_BASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT!, 10),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!, 10),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
}));