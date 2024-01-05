import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PaymentsService } from '../payments.service';
import { Payment } from '../models/payment';
import { CreatePaymentDto } from '../dtos/create.payment.dto';
import { FindPaymentDto } from '../dtos/find.payment.dto';
// import { ClientProxy } from '@nestjs/microservices';
// import { NATS_SERVICE } from '@app/common';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(
    @Inject(PaymentsService)
    private readonly paymentsService: PaymentsService,
    // @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) {}

  @Query(() => Payment, { nullable: true })
  getPaymentById(@Args('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Query(() => [Payment], { nullable: true })
  getPayments() {
    return this.paymentsService.findAll();
  }

  @Query(() => [Payment], { nullable: true })
  getPaymentsByUser(@Args('findInput') findInput: FindPaymentDto) {
    return this.paymentsService.findByUserId(findInput.userId);
  }

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentData')
    createPaymentData: CreatePaymentDto,
  ) {
    return this.paymentsService.createPayment(createPaymentData);
  }
}
