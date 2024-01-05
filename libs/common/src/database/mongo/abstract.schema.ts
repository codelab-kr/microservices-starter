import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@Schema()
export class AbstractDocument {
  @ObjectIdColumn()
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
