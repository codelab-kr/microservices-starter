import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentSettings } from '../models/payment.settings';
import { Inject } from '@nestjs/common';
import { PaymentSettingsService } from '../payment.settings.service';
import { CreatePaymentSettingsInput } from '../utils/create.paymen.settings.input';

@Resolver()
export class PaymentSettingResolver {
  constructor(
    @Inject(PaymentSettingsService)
    private readonly paymentSettingsService: PaymentSettingsService,
  ) {}

  @Mutation(() => PaymentSettings)
  async createPaymentSettings(
    @Args('createPaymentSettingData')
    createPaymentSettingData: CreatePaymentSettingsInput,
  ) {
    return await this.paymentSettingsService.createPaymentSettings(
      createPaymentSettingData,
    );
  }
}
