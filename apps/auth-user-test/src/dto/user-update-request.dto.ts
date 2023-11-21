import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequestDto {
  @IsNotEmpty({ message: 'id는 필수값입니다.' })
  @IsNumber()
  @ApiProperty({ description: 'id' })
  id: number;

  @IsNotEmpty({ message: 'isActive는 필수값입니다.' })
  @IsBoolean({ message: 'isActive는의 형식이 올바르지 않습니다.' })
  @ApiProperty({ description: 'isActive' })
  isActive: boolean;
}
