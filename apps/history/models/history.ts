import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class History extends AbstractDocument {
  @Prop()
  videoId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  userId: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
