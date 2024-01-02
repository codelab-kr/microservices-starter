import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
// import { LoginUserRequest } from '../dtos/login-user.request';

@Injectable()
export class NestAuthGuard implements CanActivate {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    if (authentication) {
      return true;
    }
    const authData = this.getAuthData(context);
    return this.natsClient.send({ cmd: 'validateUser' }, authData).pipe(
      tap((res) => {
        this.addUser(res, context);
      }),
    );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication: string;
    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest().cookies
        ?.Authentication;
    }
    return authentication ?? '';
  }

  private getAuthData(context: ExecutionContext) {
    let authData: any;
    if (context.getType() === 'rpc') {
      authData = context.switchToRpc().getData().body;
    } else if (context.getType() === 'http') {
      authData = context.switchToHttp().getRequest().body;
    }
    return authData ?? {};
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
