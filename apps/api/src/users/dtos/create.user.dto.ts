import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abcd1234' })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'test' })
  username: string;

  @Field()
  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;
}
