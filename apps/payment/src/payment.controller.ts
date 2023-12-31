import {
  Controller,
  Get,
  Post as PostDecorator,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { Payment } from './models/payment';
import { CreatePaymentInput } from './utils/create.payment.input';

@Controller('payment')
@ApiTags('PAYMENT API')
export class PaymentController {
  constructor(private readonly paymentervice: PaymentService) {}

  @Get()
  @ApiOperation({ summary: '모든 PAYMENT 조회 API' })
  @ApiOkResponse({ description: '모든 PAYMENT를 조회한다.', type: Payment })
  async findAll() {
    return await this.paymentervice.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'PAYMENT 조회 API' })
  @ApiOkResponse({ description: 'PAYMENT을 조회한다.', type: Payment })
  async findOne(@Param('id') id: number) {
    return await this.paymentervice.findById(+id);
  }

  @PostDecorator()
  @ApiOperation({
    summary: 'PAYMENT 생성 API',
    description: 'PAYMENT를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  async create(@Body() requestDto: CreatePaymentInput) {
    return await this.paymentervice.createPayment(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'PAYMENT 삭제 API',
    description: 'PAYMENT을 삭제한다.',
  })
  @ApiCreatedResponse({ description: 'PAYMENT를 생성한다.', type: Payment })
  async delete(@Param('id') id: number) {
    return await this.paymentervice.deletePayment(+id);
  }
}
