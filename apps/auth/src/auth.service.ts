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
    private readonly confisgService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getCookie(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
    };

    const maxAge = parseInt(this.confisgService.get('JWT_EXPIRATION')) * 1000;
    const token = this.jwtService.sign(tokenPayload);

    return { token, maxAge };
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      expires: new Date(),
    });
  }
}
