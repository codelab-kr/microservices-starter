import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { NATS_SERVICE } from '../../constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(NATS_SERVICE) private readonly natsService: ClientProxy) {
    super();
  }

  // save user email to session
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  // retrieve user email from session
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    let user: any;
    try {
      user = await lastValueFrom(
        this.natsService.send({ cmd: 'getUserByEmail' }, payload),
      );
    } catch (error) {
      console.log('deserializeUser error', error);
    }

    if (!user) {
      done(new Error('No User'), null);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = user;
    done(null, userInfo);
  }
}
