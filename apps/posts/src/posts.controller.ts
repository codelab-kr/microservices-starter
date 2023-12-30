import {
  Controller,
  Get,
  Post as PostDecorator,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostsService } from './posts.service';
import { Post } from './models/post';

@Controller('posts')
@ApiTags('회원 API')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '모든 회원 조회 API' })
  @ApiOkResponse({ description: '모든 회원를 조회한다.', type: Post })
  async findAll() {
    return await this.postService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: '회원 조회 API' })
  @ApiOkResponse({ description: '회원을 조회한다.', type: Post })
  async findOne(@Param('id') id: number) {
    return await this.postService.findById(+id);
  }

  @PostDecorator()
  @ApiOperation({ summary: '회원 생성 API', description: '회원를 생성한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: Post })
  async create(@Body() requestDto: PostCreateRequestDto) {
    return await this.postService.createPost(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '회원 삭제 API', description: '회원을 삭제한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: Post })
  async delete(@Param('id') id: number) {
    return await this.postService.deletePost(+id);
  }
}
