import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schemas/user.schema';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const now = new Date();
    const interval = parseInt(this.configService.get('JWT_EXPIRATION'));
    const expires = new Date(now.getTime() + interval * 1000);

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      expires: new Date(),
    });
  }
}
