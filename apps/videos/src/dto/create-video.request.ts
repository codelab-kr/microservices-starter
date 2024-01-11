import { IsNotEmpty, IsString } from 'class-validator';
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
  userId: string;
}
