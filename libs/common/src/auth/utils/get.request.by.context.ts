import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getRequestByContext = (context: ExecutionContext): any => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest();
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData();
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req;
};
