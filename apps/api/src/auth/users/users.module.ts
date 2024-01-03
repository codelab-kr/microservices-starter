import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsClientModule } from '../../nats-client/nats-client.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
  providers: [UsersResolver],
})
export class UsersModule {}
