import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => Int)
  userId: number;
}
