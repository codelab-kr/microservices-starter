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
import { PostsService } from './posts.service';
import { Post } from './models/post';
import { CreatePostInput } from './utils/create.post.input';

@Controller('posts')
@ApiTags('POST API')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '모든 POST 조회 API' })
  @ApiOkResponse({ description: '모든 POST를 조회한다.', type: Post })
  async findAll() {
    return await this.postService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'POST 조회 API' })
  @ApiOkResponse({ description: 'POST을 조회한다.', type: Post })
  async findOne(@Param('id') id: number) {
    return await this.postService.findById(+id);
  }

  @PostDecorator()
  @ApiOperation({ summary: 'POST 생성 API', description: 'POST를 생성한다.' })
  @ApiCreatedResponse({ description: 'POST를 생성한다.', type: Post })
  async create(@Body() requestDto: CreatePostInput) {
    return await this.postService.createPost(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'POST 삭제 API', description: 'POST을 삭제한다.' })
  @ApiCreatedResponse({ description: 'POST를 생성한다.', type: Post })
  async delete(@Param('id') id: number) {
    return await this.postService.deletePost(+id);
  }
}
