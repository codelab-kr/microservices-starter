import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePaymentInput {
  @IsNotEmpty()
  @Field()
  id: string;

  @Field({ nullable: true })
  amount?: number;
}
