import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaymentsService } from '../payments.service';
import { Payment } from '../models/payment';
import { CreatePaymentDto } from '../dtos/create.payment.dto';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(
    @Inject(PaymentsService)
    private readonly paymentsService: PaymentsService,
  ) {}

  @Query(() => Payment, { nullable: true })
  getPaymentById(@Args('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Query(() => [Payment], { nullable: true })
  getPayments() {
    return this.paymentsService.findAll();
  }

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentData')
    createPaymentData: CreatePaymentDto,
  ) {
    return this.paymentsService.createPayment(createPaymentData);
  }
}
