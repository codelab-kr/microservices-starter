import { ExecutionContext, Injectable } from '@nestjs/common';
import { getRequestByContext } from '../utils/get.request.by.context';
import { AuthGuard as ForJwtAuthGaurd } from '@nestjs/passport';

@Injectable()
class GoogleAuthGuard extends ForJwtAuthGaurd('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = getRequestByContext(context);
    await super.logIn(request);
    return result;
  }
}

const GoogleGuard = GoogleAuthGuard;
export { GoogleGuard };
