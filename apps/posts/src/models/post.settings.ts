import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'post_settings' })
@ObjectType()
export class PostSettings {
  @PrimaryColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  postId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  commentable: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  shareable: boolean;
}
