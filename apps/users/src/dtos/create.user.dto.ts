import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 'abcd1234' })
  password: string;

  @ApiProperty({ example: 'test' })
  username: string;

  @ApiProperty({ example: true })
  isSubscribed?: boolean;
}
