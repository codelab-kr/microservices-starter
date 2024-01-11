import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';

@Module({
  controllers: [UsersController],
  providers: [
    UsersResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
  ],
})
export class UsersModule {}
