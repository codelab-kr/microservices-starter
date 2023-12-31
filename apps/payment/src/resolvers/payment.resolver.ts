import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreatePaymentInput } from '../utils/create.payment.input';
import { PaymentService } from '../payment.service';
import { PaymentettingsService } from '../payment.settings.service';
import { Payment } from '../models/payment';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
    private readonly paymentettingsService: PaymentettingsService,
  ) {}

  @Query(() => Payment, { nullable: true })
  getPaymentById(@Args('id', { type: () => Int }) id: number) {
    return this.paymentService.findById(id);
  }

  @Query(() => [Payment], { nullable: true })
  getPayment() {
    return this.paymentService.findAll();
  }

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentData')
    createPaymentData: CreatePaymentInput,
  ) {
    return this.paymentService.createPayment(createPaymentData);
  }

  // @ResolveField('settings', () => Paymentettings, { nullable: true })
  // getPaymentetting(@Parent() payment: Payment) {
  //   return this.paymentettingsService.findByPaymentId(payment.id);
  // }
}
