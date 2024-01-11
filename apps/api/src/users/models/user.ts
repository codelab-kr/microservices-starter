import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from '../../payments/models/payment';
@ObjectType()
export class User {
  @Field()
  id?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  isSubscribed?: boolean;

  @Field({ nullable: true })
  providerId?: string;

  @Field({ nullable: true })
  photo?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
