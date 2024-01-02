import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment';
import { Field, ObjectType } from '@nestjs/graphql';
@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: false })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ nullable: false })
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field()
  isSubscribed?: boolean;

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
