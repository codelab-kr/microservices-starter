import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Paymentettings } from './payment.settings';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment' })
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content?: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @OneToOne(() => Paymentettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: Paymentettings;
}
