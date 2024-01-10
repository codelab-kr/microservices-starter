import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { SessionSerializer } from './session/session.serializer';
import { NATS_SERVICE } from '../constant/services';
import { NatsClientService } from '../nats-client/nats-client.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [NatsClientModule, PassportModule.register({ session: true })],
  providers: [
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
    LocalAuthGuard,
    AuthGuard,
    LocalStrategy,
    SessionSerializer,
  ],
  exports: [NATS_SERVICE, LocalAuthGuard, AuthGuard, SessionSerializer],
})
export class SessionAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
