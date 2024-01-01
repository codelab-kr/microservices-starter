import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;
}
