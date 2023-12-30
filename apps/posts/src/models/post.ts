import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PostSettings } from './post.settings';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  content?: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column('json', { nullable: true })
  @Field()
  settings?: PostSettings;

  // static of(params: Partial<Post>): Post {
  //   const post = new Post();
  //   Object.assign(post, params);

  //   return post;
  // }

  // static create(title: string, content: string, userId: number): Post {
  //   const post = new Post();
  //   post.title = title;
  //   post.content = content;
  //   post.userId = userId;
  //   return post;
  // }
}
