import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AUTH_SERVICE } from '../../constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: ClientProxy) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await lastValueFrom(
      this.authService.send({ cmd: 'getUserByEmail' }, payload),
    );
    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
