import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Column, Entity } from 'typeorm';
import { AbstractDocument } from '@app/common';

@Entity()
@Schema({ versionKey: false })
export class Video extends AbstractDocument {
  @Column()
  @Prop()
  title: string;

  @Column()
  @Prop()
  type: string;

  @Column()
  @Prop()
  path: string;

  @Column()
  @Prop()
  description: string;

  @Column()
  @Prop({ type: SchemaTypes.ObjectId })
  user_id: Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
