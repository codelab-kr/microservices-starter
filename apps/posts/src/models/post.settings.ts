import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PostSettings {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  postId: number;

  @Column()
  @Field({ defaultValue: false })
  commentable: boolean;

  @Column()
  @Field({ defaultValue: false })
  shareable: boolean;
}
