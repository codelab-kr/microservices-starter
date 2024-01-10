import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { NatsClientModule } from '@app/common';
@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
  providers: [UsersResolver],
})
export class UsersModule {}
