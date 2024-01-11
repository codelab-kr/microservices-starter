import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserRequest {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'abcd1234' })
  password: string;
}
