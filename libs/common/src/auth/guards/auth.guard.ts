import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getRequestByContext } from '../utils/get.request.by.context';
import { ConfigService } from '@nestjs/config';
import { AuthGuard as ForJwtAuthGaurd } from '@nestjs/passport';

let AuthGuard: any;
const session = new ConfigService().get('SESSION') === 'true';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = getRequestByContext(context);
    return request.isAuthenticated(); // check if user is authenticated (from session)
  }
}

@Injectable()
class JwtAuthGuard extends ForJwtAuthGaurd('jwt') {
  // 다양한 컨텍스트 타입(gql, rpc, http)을 지원할 수 있도록 getRequest 를 getRequestByContext 를 리턴하도록 오버라이딩 했는데
  // TODO: http만 테스트하고 나머지 컨텍스트 타입은 테스트하지 않았음(테스트 요망)
  getRequest(context: ExecutionContext): any {
    return getRequestByContext(context);
  }
}

if (session) AuthGuard = SessionAuthGuard;
else AuthGuard = JwtAuthGuard;
export { AuthGuard };
