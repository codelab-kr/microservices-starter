import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test@test.com' })
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  type: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  path: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  description: string;

  @Field(() => SchemaTypes.ObjectId)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  user_id: Types.ObjectId;
}
