import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../repository/dto/base.dto';

export class OrderDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  ice: boolean;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
