import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRequestByContext } from '../utils/get.request.by.context';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const sessionAuth = new ConfigService().get('SESSION_AUTH') === 'true';
    console.log('sessionAuth', sessionAuth, typeof sessionAuth);
    if (sessionAuth) {
      const request = getRequestByContext(context);
      await super.logIn(request); // save user to session
    }
    return result;
  }
}
