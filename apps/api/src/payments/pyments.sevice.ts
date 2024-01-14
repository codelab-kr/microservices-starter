import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';
import { CreatePaymentDto } from './dtos/create.payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createPayments(createPaymentsInput: CreatePaymentDto) {
    return this.natsClient.send({ cmd: 'createPayment' }, createPaymentsInput);
  }

  getPayments(userId: string) {
    return this.natsClient.send({ cmd: 'getPayments' }, { userId });
  }
}
