import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AUTH_SERVICE } from '../../constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: ClientProxy) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('validate - email', email, 'password', password);
    const user = await lastValueFrom(
      this.authService.send({ cmd: 'validateUser' }, { email, password }),
    );
    if (!user) {
      return null;
    }
    return user;
  }
}
