import { Controller, Get, Post, Res } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create.payment.dto';
import { CurrentUser } from '@app/common';
import { PaymentsService } from './pyments.sevice';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsServic: PaymentsService) {}

  @Get()
  async list(@Res() res: Response, @CurrentUser() user?: any) {
    if (!user) {
      res.redirect('/login');
    }
    const payments = await lastValueFrom(
      this.paymentsServic.getPayments(user.id),
    );
    res.render('payment-list', { isPayments: true, payments, user });
  }

  @Post()
  async CreatePayment(@Res() res: Response, @CurrentUser() user: any) {
    const createPaymentDto: CreatePaymentDto = {
      amount: 10000,
      userId: user.id,
    };
    const paymentResult = await lastValueFrom(
      this.paymentsServic.createPayment(createPaymentDto),
    );
    if (paymentResult) {
      return res.redirect('/payments');
    }
  }
}
