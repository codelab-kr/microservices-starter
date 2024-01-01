import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abcd1234' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'test' })
  username: string;

  @IsOptional()
  @ApiProperty({ example: true })
  isSubscribed?: boolean;
}
