import { Module } from '@nestjs/common';
import { ExceptionsFilter } from './filters/exception.filter';
import { APP_FILTER /*, APP_INTERCEPTOR */ } from '@nestjs/core';
// import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-redis-store';

@Module({
  // imports: [
  //   CacheModule.register({
  //     ttl: 10,
  //     max: 100,
  //     isGlobal: true,
  //     store: redisStore,
  //     host: 'redis',
  //     port: 6379,
  //   }),
  // ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class EnhancerModule {}
