import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { NATS_SERVICE } from '@app/common';

@Controller('payments')
export class PaymentsController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  CreatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.natsClient.send({ cmd: 'createPayment' }, createPaymentDto);
  }
}
