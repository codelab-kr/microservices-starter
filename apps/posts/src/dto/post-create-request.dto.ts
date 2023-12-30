import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: '제목' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @ApiProperty({ description: '내용' })
  content: string;

  @IsNumber()
  @ApiProperty({ description: '작성자ID' })
  userId: number;

  // toEntity(): Post {
  //   return Post.create(this.title, this.content, this.userId);
  // }
}
