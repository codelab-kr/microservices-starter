import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { MysqlModule, TypeOrmExModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentsRepository } from './repositories/payments.repository';
import { NestStrategy } from '../strategies/nest.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
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
    TypeOrmExModule.forCustomRepository([UsersRepository, PaymentsRepository]),
    MysqlModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy, NestStrategy],
  exports: [UsersService],
})
export class UsersModule {}
