import { Injectable } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class NatsClientService {
  @Client({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  })
  client: ClientProxy;

  // TODO: 이 메서드를 꼭 사용해야 하는지 확인해보기
  send(pattern: any, data: any) {
    return this.client.send(pattern, data);
  }
}
