import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserRequest {
  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty()
  id?: string;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty()
  password?: string;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty()
  username?: string;

  @Field()
  @IsOptional()
  @ApiProperty()
  isSubscribed?: boolean;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a-/AOh14GjKQG9vq1X0w6ZvP8e8vX4Z9v2l9iJXOZtQXw7D=s96-c',
  })
  photo?: string;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty()
  paymentId?: string;
}
