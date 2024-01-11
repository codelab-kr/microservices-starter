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

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Payment, (payment) => payment.user)
  @JoinColumn()
  @Field(() => [Payment], { nullable: true })
  payments?: Payment[];
}
