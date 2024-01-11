import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteVideoInput {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;
}
