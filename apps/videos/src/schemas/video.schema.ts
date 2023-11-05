import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Video extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  path: string;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.ObjectId })
  user_id: Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
