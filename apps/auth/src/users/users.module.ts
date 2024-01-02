import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { DataModule, TypeOrmExModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsRepository } from './repositories/payments.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository, PaymentsRepository]),
    DataModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
