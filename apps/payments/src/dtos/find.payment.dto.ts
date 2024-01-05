import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPaymentDto {
  @Field()
  userId: string;
}
