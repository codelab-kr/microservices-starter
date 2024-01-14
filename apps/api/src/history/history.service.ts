import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';
import { CreateHistoryInput } from './dtos/create-history.input';

@Injectable()
export class HistoryService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createHistory(createHistoryInput: CreateHistoryInput) {
    return this.natsClient.emit('videoViewed', createHistoryInput);
  }

  getHistory(userId: string) {
    return this.natsClient.send({ cmd: 'getHistory' }, { userId });
  }
}
