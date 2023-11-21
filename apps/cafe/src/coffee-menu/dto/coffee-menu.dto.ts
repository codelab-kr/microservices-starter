import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../repository/dto/base.dto';

export class CoffeeMenuDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  ice: boolean;

  @IsBoolean()
  @IsNotEmpty()
  hot: boolean;
}
