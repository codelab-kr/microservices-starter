import { ClientProxy } from '@nestjs/microservices';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Payment } from './models/payment';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { NATS_SERVICE } from '@app/common';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Mutation(() => Payment)
  CreatePayment(@Args('createPaymentDto') createPaymentDto: CreatePaymentDto) {
    return this.natsClient.send({ cmd: 'createPayment' }, createPaymentDto);
  }
}
