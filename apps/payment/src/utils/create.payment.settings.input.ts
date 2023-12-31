import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentettingsInput {
  @Field(() => Int)
  paymentId: number;

  @Field({ defaultValue: false, nullable: true })
  commentable: boolean;

  @Field({ defaultValue: false, nullable: true })
  shareable: boolean;
}
