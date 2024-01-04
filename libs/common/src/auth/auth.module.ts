import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { NatsClientService } from '../nats-client/nats-client.service';
import { AUTH_SERVICE } from '../constant/services';

@Module({
  imports: [NatsClientModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: NatsClientService,
    },
  ],
  exports: [AUTH_SERVICE],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
