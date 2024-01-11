import { ExecutionContext, Injectable } from '@nestjs/common';
import { getRequestByContext } from '../utils/get.request.by.context';
import { ConfigService } from '@nestjs/config';
import { AuthGuard as ForJwtAuthGaurd } from '@nestjs/passport';

let GoogleGuard: any;
const google = new ConfigService().get('GOOGLE') === 'true';

@Injectable()
class GoogleAuthGuard extends ForJwtAuthGaurd('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = getRequestByContext(context);
    // if (result) {
    await super.logIn(request);
    // }
    return result;
  }
}

if (google) GoogleGuard = GoogleAuthGuard;
else GoogleGuard = null;
export { GoogleGuard };
