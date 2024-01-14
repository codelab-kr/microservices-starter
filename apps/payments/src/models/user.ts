import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Payment } from './payment';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id?: string;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password?: string;

  @Column({ nullable: false })
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isSubscribed?: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  providerId?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentId?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
