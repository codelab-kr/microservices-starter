import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  path: string;
}
