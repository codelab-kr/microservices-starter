import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateVideoRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  type: string;

  @IsString()
  path: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  user_id: Types.ObjectId;
}
