import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetVideoArgs {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;
}
