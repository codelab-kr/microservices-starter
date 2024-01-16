import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '@app/common';
import { CreatePaymentDto } from './dtos/create.payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  createPayment(createPaymentInput: CreatePaymentDto) {
    try {
      return this.natsClient.send({ cmd: 'createPayment' }, createPaymentInput);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  getPayments(userId: string) {
    try {
      return this.natsClient.send({ cmd: 'getPayments' }, { userId });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
