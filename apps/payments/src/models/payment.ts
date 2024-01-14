import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'payment' })
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column('float')
  @Field()
  amount: number;

  @ManyToOne(() => User, (user) => user.payments)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
