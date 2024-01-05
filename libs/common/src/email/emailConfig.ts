import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));

export const testEmailConfig = registerAs('testemail', () => ({
  host: process.env.TEST_EMAIL_HOST,
  port: Number(process.env.TEST_EMAIL_PORT),
  auth: {
    user: process.env.TEST_EMAIL_AUTH_USER,
    pass: process.env.TEST_EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.TEST_EMAIL_BASE_URL,
}));
