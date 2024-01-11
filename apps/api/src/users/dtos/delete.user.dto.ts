import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteUserDto {
  @Field()
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
