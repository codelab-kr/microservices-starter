import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Query,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoRequest } from './dto/create-video.request';
import { JwtAuthGuard } from '@app/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVideo(@Body() request: CreateVideoRequest, @Req() req: any) {
    return this.videosService.create(request, req.cookies?.Authentication);
  }

  @Get('hello')
  async getHello() {
    return this.videosService.getHello();
  }

  @Get(':_id')
  // @UseGuards(JwtAuthGuard)
  async getVideo(@Param('_id') _id: string) {
    return this.videosService.getVideo({ _id });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getVideos() {
    return this.videosService.getVideos();
  }

  // test: /videos/get?url=https://jsonplaceholder.typicode.com/todos/1
  @Get('get')
  @UseGuards(JwtAuthGuard)
  async get(@Query('url') url: string): Promise<any[]> {
    return this.videosService.get(url);
  }

  @Get('error')
  @UseGuards(JwtAuthGuard)
  async error(): Promise<any> {
    return this.videosService.error();
  }
}
