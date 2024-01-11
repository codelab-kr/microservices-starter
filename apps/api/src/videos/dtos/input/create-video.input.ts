import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  userId: string;
}
