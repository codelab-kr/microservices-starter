import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Video extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  path: string;

  @Prop({ nullable: true })
  description?: string;

  @Prop()
  userId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
