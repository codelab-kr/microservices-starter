import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserLoginRequestDto {
  @IsNotEmpty({ message: '이메일(email)은 필수값입니다.' })
  @IsString({ message: '이메일(email)의 형식이 올바르지 않습니다.' })
  @Length(4, 100)
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsNotEmpty({ message: '비밀번호(password)은 필수값입니다.' })
  @IsString({ message: '비밀번호(password)의 형식이 올바르지 않습니다.' })
  @Length(4, 100)
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
