import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequestByContext } from './get.request.by.context';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from '../../util/shared.util';

const configService = new ConfigService();

export const CurrentUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const session = configService.get('SESSION') === 'true';
    const req = getRequestByContext(context);
    let userInfo: any;
    if (session) {
      userInfo = req.user;
    } else {
      userInfo = { ...userInfo, ...(await addToken(userInfo)) };
    }
    return isEmpty(userInfo) ? null : userInfo;
  },
);

const addToken = async (userInfo: any) => {
  try {
    const jwtService = await import('@nestjs/jwt');
    const { JwtService } = jwtService;
    const jwtModuleOptions = {
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: configService.get('EXPIRESIN') },
    };
    const jwtServiceInstance = new JwtService(jwtModuleOptions);
    const { id: userId } = userInfo;
    return {
      access_token: jwtServiceInstance.sign({ userId }),
    };
  } catch (e) {
    console.error(e);
  }
};
