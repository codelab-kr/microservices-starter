import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity } from 'typeorm';
import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@Schema({ versionKey: false })
@ObjectType()
export class Video extends AbstractDocument {
  @Column()
  @Prop()
  @Field()
  title: string;

  @Column()
  @Prop()
  @Field()
  type: string;

  @Column()
  @Prop()
  @Field()
  path: string;

  @Column({ nullable: true })
  @Prop({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Prop()
  @Field()
  userId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
