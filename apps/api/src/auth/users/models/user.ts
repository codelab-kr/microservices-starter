import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '../../../payments/models/payment';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  isSubscribed?: boolean;

  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
