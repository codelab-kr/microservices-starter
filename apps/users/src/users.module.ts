import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MysqlModule, TypeOrmExModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsRepository } from './repositories/payments.repository';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository, PaymentsRepository]),
    MysqlModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
