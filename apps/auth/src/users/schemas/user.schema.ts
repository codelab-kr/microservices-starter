import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDocument } from '@app/common';

@ObjectType()
@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
