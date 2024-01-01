import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Post,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Payment } from './models/payment';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { CreatePaymentInput } from './utils/create.payment.input';

@Controller('payments')
@ApiTags('PAYMENT API')
export class PaymentsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private readonly paymentService: PaymentsService,
  ) {}

  @EventPattern('createPayment')
  createPayment(@Payload() data: CreatePaymentDto) {
    console.log('CreatePaymentDto', data);
    this.natsClient.emit('paymentCreated', data);
  }

  @Get()
  @ApiOperation({ summary: '모든 PAYMENT 조회 API' })
  @ApiOkResponse({ description: '모든 PAYMENT를 조회한다.', type: Payment })
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'PAYMENT 조회 API' })
  @ApiOkResponse({ description: 'PAYMENT을 조회한다.', type: Payment })
  async findOne(@Param('id') id: number) {
    return await this.paymentService.findById(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'PAYMENT 생성 API',
    description: 'PAYMENT를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  async create(@Body() requestDto: CreatePaymentInput) {
    return await this.paymentService.createPayment(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'PAYMENT 삭제 API',
    description: 'PAYMENT을 삭제한다.',
  })
  @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  async delete(@Param('id') id: number) {
    return await this.paymentService.deletePayment(+id);
  }
}
