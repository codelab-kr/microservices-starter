import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateVideoInput {
  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty({ example: '655235bd083e3149d3a77777' })
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  title: string;

  @Field(() => String)
  @IsOptional()
  @ApiProperty({ example: 'test' })
  type: string;

  @Field(() => String)
  @IsOptional()
  @ApiProperty({ example: 'test' })
  path: string;

  @Field(() => String)
  @IsOptional()
  @ApiProperty({ example: 'test' })
  description: string;

  @Field(() => String)
  @IsOptional()
  @ApiProperty({ example: 'test' })
  userId: string;
}
