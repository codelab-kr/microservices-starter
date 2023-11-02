import {
  ArgumentsHost,
  HttpException,
  Catch,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);
  catch(exception: any | unknown, host: ArgumentsHost) {
    this.logger.warn('Exception filter called');
    super.catch(exception, host);
    if (!(exception instanceof HttpException)) {
      return;
    }
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      url: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception instanceof Error ? exception.message : exception,
      stack: exception instanceof Error ? exception.stack : null,
    };

    this.logger.warn(
      `Exception: ${responseBody.url} \n  Stack: ${responseBody.stack}`,
    );
  }
}
