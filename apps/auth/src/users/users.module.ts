import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { DataModule, TypeOrmExModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './repositories/payments.repository';
import { NestStrategy } from '../strategies/nest.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository, PaymentsRepository]),
    DataModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, NestStrategy],
  exports: [UsersService],
})
export class UsersModule {}
