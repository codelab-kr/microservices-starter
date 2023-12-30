import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PostSettings } from './post.settings';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'post' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content?: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @OneToOne(() => PostSettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: PostSettings;
}
