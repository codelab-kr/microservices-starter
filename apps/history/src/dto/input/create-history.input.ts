import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHistoryInput {
  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test@test.com' })
  videoId: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  userId: string;
}
