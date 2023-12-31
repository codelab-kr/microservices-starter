import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePaymentettingsInput } from '../utils/create.payment.settings.input';
import { Paymentettings } from '../models/payment.settings';

import { Inject } from '@nestjs/common';
import { PaymentettingsService } from '../payment.settings.service';

@Resolver()
export class PaymentettingResolver {
  constructor(
    @Inject(PaymentettingsService)
    private readonly paymentettingsService: PaymentettingsService,
  ) {}

  @Mutation(() => Paymentettings)
  async createPaymentettings(
    @Args('createPaymentettingData')
    createPaymentettingData: CreatePaymentettingsInput,
  ) {
    return await this.paymentettingsService.createPaymentettings(
      createPaymentettingData,
    );
  }
}
