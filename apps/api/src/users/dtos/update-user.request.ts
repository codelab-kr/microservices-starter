import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserRequest {
  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'bb5d4732-e76e-4acf-ab5c-d45db6598c1f' })
  id: string;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'abcd1234' })
  password?: string;

  @Field()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'test' })
  username?: string;

  @Field()
  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '102121788398419656772' })
  providerId?: string;

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
  @ApiProperty({ example: null })
  paymentId?: string;
}
