import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity({ name: 'payment' })
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
