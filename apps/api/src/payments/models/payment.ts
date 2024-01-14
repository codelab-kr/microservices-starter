import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@ObjectType()
export class Payment {
  @Field()
  id: string;

  @Field()
  amount: number;

  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
