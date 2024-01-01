import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreatePaymentInput } from '../utils/create.payment.input';
import { PaymentsService } from '../payments.service';
import { PaymentSettingsService } from '../payment.settings.service';
import { Payment } from '../models/payment';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(
    @Inject(PaymentsService)
    private readonly paymentsService: PaymentsService,
    private readonly paymentSettingsService: PaymentSettingsService,
  ) {}

  @Query(() => Payment, { nullable: true })
  getPaymentById(@Args('id', { type: () => Int }) id: number) {
    return this.paymentsService.findById(id);
  }

  @Query(() => [Payment], { nullable: true })
  getPayments() {
    return this.paymentsService.findAll();
  }

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentData')
    createPaymentData: CreatePaymentInput,
  ) {
    return this.paymentsService.createPayment(createPaymentData);
  }

  // @ResolveField('settings', () => PaymentSettings, { nullable: true })
  // getPaymentSetting(@Parent() payment: Payment) {
  //   return this.paymentSettingsService.findByPaymentId(payment.id);
  // }
}
