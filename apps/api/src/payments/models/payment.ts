import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../auth/users/models/user';

@ObjectType()
export class Payment {
  @Field()
  id: string;

  @Field()
  amount: number;

  @Field(() => User)
  user: User;
}
