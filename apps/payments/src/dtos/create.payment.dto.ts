import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreatePaymentDto {
  @Field()
  amount: number;

  @Field()
  userId: string;
}
