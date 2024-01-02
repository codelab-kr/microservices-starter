import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
// import { TokenPayload } from '../auth.controller';

export interface TokenPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const authentication =
            request?.Authentication ||
            request?.headers?.authorization?.split(' ')[1] ||
            request?.headers?.cookie?.split('=')[1];
          return authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      return await this.usersService.getUserById(userId);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
