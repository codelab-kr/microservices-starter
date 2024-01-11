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

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abcd1234' })
  password?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'test' })
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'google-oauth2|1234567890' })
  providerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a-/AOh14GjKQG9vq1X0w6ZvP8e8vX4Z9v2l9iJXOZtQXw7D=s96-c',
  })
  photo?: string;
}
