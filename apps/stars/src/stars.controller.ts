import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StarCreateRequestDto } from './dto/star-create-request.dto';
import { StarsService } from './stars.service';
import { Star } from './star.entity';

@Controller('stars')
@ApiTags('회원 API')
export class StarsController {
  constructor(private readonly starService: StarsService) {}

  @Get()
  @ApiOperation({ summary: '모든 회원 조회 API' })
  @ApiOkResponse({ description: '모든 회원를 조회한다.', type: Star })
  async findAll() {
    return await this.starService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: '회원 조회 API' })
  @ApiOkResponse({ description: '회원을 조회한다.', type: Star })
  async findOne(@Param('id') id: number) {
    return await this.starService.findById(+id);
  }

  @Post()
  @ApiOperation({ summary: '회원 생성 API', description: '회원를 생성한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: Star })
  async create(@Body() requestDto: StarCreateRequestDto) {
    return await this.starService.createStar(requestDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '회원 삭제 API', description: '회원을 삭제한다.' })
  @ApiCreatedResponse({ description: '회원를 생성한다.', type: Star })
  async delete(@Param('id') id: number) {
    return await this.starService.deleteStar(+id);
  }
}
