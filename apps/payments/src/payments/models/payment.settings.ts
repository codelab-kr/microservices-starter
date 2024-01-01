import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'payment_settings' })
@ObjectType()
export class PaymentSettings {
  @PrimaryColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  paymentId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  commentable: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  shareable: boolean;
}
