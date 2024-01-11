import {
  Controller,
  Get,
  Query,
  Param,
  // UseInterceptors,
} from '@nestjs/common';
import { VideosService } from './videos.service';
// import { CacheInterceptor } from '@nestjs/cache-manager';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateVideoRequest } from './dto/create-video.request';
// @UseInterceptors(CacheInterceptor)

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @MessagePattern({ cmd: 'createVideo' })
  async createVideo(@Payload() data: CreateVideoRequest) {
    return await this.videosService.createVideo(data);
  }

  @Get(':_id')
  async getVideo(@Param('_id') _id: string) {
    return this.videosService.getVideo(_id);
  }

  @Get()
  async getVideos() {
    return this.videosService.getVideos();
  }

  // test: /videos/get?url=https://jsonplaceholder.typicode.com/todos/1
  @Get('get')
  async get(@Query('url') url: string): Promise<any[]> {
    return this.videosService.get(url);
  }

  @Get('error')
  async error(): Promise<any> {
    return this.videosService.error();
  }
}
