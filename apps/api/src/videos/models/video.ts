import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop()
  userId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
