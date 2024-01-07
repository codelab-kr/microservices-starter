import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    let request: any;
    if (context.getType() === 'rpc') {
      request = context.switchToRpc().getData();
    } else if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    }
    return request.session.user ? true : false;
  }
}
