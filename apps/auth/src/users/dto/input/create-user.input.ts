import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'abcd1234' })
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;
}
