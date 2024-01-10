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

  send(pattern: any, data: any) {
    return this.client.send(pattern, data);
  }
}
