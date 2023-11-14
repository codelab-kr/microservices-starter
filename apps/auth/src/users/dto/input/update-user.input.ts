import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: '655235bd083e3149d3a77777' })
  _id: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: 'abcd1234' })
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: 'test' })
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;
}
