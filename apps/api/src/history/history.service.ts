import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';
import { CreateHistoryInput } from './dtos/create-history.input';

@Injectable()
export class HistoryService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createHistory(createHistoryInput: CreateHistoryInput) {
    try {
      return this.natsClient.send('videoViewed', createHistoryInput);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getHistory(userId: string) {
    try {
      return this.natsClient.send({ cmd: 'getHistory' }, { userId });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
