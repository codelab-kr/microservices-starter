import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostSettingsInput {
  @Field(() => Int)
  postId: number;

  @Field({ defaultValue: false, nullable: true })
  commentable: boolean;

  @Field({ defaultValue: false, nullable: true })
  shareable: boolean;
}
