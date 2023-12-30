import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'userId' })
  userId: number;
}
