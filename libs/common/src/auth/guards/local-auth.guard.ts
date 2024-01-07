import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    let request: any;
    if (context.getType() === 'rpc') {
      request = context.switchToRpc().getData();
    } else if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    }
    await super.logIn(request);
    const { email, id: userId } = request.user;
    request.session.user = { email, userId };
    return result;
  }
}
