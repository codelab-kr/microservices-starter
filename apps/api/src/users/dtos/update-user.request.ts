import { IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  password?: string;

  @IsString()
  username?: string;
}
