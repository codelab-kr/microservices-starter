import * as session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

export function setSession(app: NestExpressApplication) {
  const configService = app.get(ConfigService);
  const redisClient = new Redis(configService.get('REDIS_URL') as string);
  app.use(cookieParser());
  app.use(
    session({
      secret: configService.get('SECRET') as string,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
      cookie: {
        httpOnly: true,
        maxAge: parseInt(configService.get('EXPIRESIN'), 10),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
