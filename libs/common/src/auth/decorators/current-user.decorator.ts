import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentUserByContext = (context: ExecutionContext): any => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().session.user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().session.user;
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.session.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
