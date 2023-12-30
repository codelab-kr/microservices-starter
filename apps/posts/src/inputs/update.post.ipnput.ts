import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @IsNotEmpty()
  @Field()
  @ApiProperty()
  id: number;

  @Field()
  @ApiProperty()
  title?: string;

  @Field({ nullable: true })
  @ApiProperty()
  content?: string;

  @Field(() => Int)
  @ApiProperty()
  userId?: number;
}
