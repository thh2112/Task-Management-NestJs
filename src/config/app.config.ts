import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'BE_CORE',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  secret: process.env.APP_SECRET || 'e6f27f5a',
  jwtExpiresIn: process.env.APP_JWT_EXPIRES_IN || '1h',
}));
