import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MysqlModule, TypeOrmExModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './repositories/payments.repository';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository, PaymentsRepository]),
    MysqlModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
