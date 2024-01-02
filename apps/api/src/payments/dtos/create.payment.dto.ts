import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10000 })
  @Field()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'cb4ab319-00c6-4026-b18b-04f3013008fb' })
  @Field()
  userId: string;
}
