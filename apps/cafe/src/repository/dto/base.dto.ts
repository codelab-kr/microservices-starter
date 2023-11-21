import { IsNotEmpty, IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
