import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  CreatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    console.log('createPaymentDto', createPaymentDto);
    // event pattern
    this.natsClient.emit('createPayment', createPaymentDto);
  }
}
