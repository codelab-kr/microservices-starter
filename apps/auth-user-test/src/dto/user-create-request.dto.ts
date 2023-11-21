import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequestDto {
  @IsNotEmpty({ message: '이름(username)은 필수값입니다.' })
  @IsString({ message: '이름(username)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '이름' })
  firstName: string;

  @IsNotEmpty({ message: '이름(username)은 필수값입니다.' })
  @IsString({ message: '이름(username)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '이름' })
  lastName: string;

  @IsBoolean({ message: '이름(username)의 형식이 올바르지 않습니다.' })
  @ApiProperty({ description: '이름' })
  isActive: boolean;

  // toEntity(): User {
  //   return User.create(this.firstName, this.lastName, this.isActive);
  // }
}
