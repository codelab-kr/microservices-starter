import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';
import { UsersService } from './users.sevice';

@Module({
  controllers: [UsersController],
  providers: [
    UsersResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
    UsersService,
  ],
})
export class UsersModule {}
