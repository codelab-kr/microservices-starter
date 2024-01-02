import { Controller, Get, Param, Delete, Inject } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Payment } from './models/payment';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { FindPaymentDto } from './dtos/find.payment.dto';
// import { CreatePaymentInput } from './dtos/create.payment.input';

@Controller('payments')
@ApiTags('PAYMENT API')
export class PaymentsController {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private readonly paymentService: PaymentsService,
  ) {}

  @MessagePattern({ cmd: 'createPayment' })
  async createPayment(@Payload() data: CreatePaymentDto) {
    const newPayment = await this.paymentService.createPayment(data);
    if (newPayment) {
      this.natsClient.emit('paymentCreated', newPayment);
      return newPayment;
    }
  }

  @MessagePattern({ cmd: 'getPaymentByUserId' })
  async getPaymentByUser(@Payload() data: FindPaymentDto) {
    return this.paymentService.findByUserId(data.userId);
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
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findById(id);
  }

  // @Post()
  // @ApiOperation({
  //   summary: 'PAYMENT 생성 API',
  //   description: 'PAYMENT를 생성한다.',
  // })
  // @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  // async create(@Body() requestDto: CreatePaymentInput) {
  //   return await this.paymentService.createPayment(requestDto);
  // }

  @Delete('/:id')
  @ApiOperation({
    summary: 'PAYMENT 삭제 API',
    description: 'PAYMENT을 삭제한다.',
  })
  @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  delete(@Param('id') id: number) {
    return this.paymentService.deletePayment(+id);
  }
}
