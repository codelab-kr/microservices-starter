import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Video extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  path: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
