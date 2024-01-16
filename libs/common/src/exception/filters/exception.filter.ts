import {
  ArgumentsHost,
  Catch,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ApolloError } from 'apollo-server-express'; // for graphql
import { AxiosError } from 'axios';
import { BaseExceptionFilter } from '@nestjs/core';
import { IExceptionResponse } from '../exception.interface';
import { WsException } from '@nestjs/websockets';

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  private res: IExceptionResponse;

  private ExceptionFilter(
    exception: RpcException | WsException | AxiosError | ApolloError,
  ) {
    const error =
      exception instanceof RpcException || exception instanceof WsException
        ? exception.getError()
        : exception.response?.data;
    this.res = error['response'];
  }

  // TODO: Test
  private httpExceptionFilter(exception: HttpException): void {
    this.res = exception.getResponse() as IExceptionResponse;
  }

  catch(exception: any, host: ArgumentsHost) {
    super.catch(exception, host);
    if (
      exception instanceof RpcException ||
      exception instanceof WsException ||
      exception instanceof AxiosError ||
      exception instanceof ApolloError
    ) {
      this.ExceptionFilter(exception);
    } else if (exception instanceof HttpException) {
      this.httpExceptionFilter(exception);
    } else {
      return new InternalServerErrorException(exception, exception.message);
    }
    this.logger.error(this.res);
  }
}
