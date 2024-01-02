import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}
