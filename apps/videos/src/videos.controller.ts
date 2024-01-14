import {
  Controller,
  Body,
  // UseInterceptors,
} from '@nestjs/common';
import { VideosService } from './videos.service';
// import { CacheInterceptor } from '@nestjs/cache-manager';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateVideoInput } from './dto/input/create-video.input';
// @UseInterceptors(CacheInterceptor)

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @MessagePattern({ cmd: 'createVideo' })
  async createVideo(@Payload() data: CreateVideoInput) {
    return await this.videosService.createVideo(data);
  }

  @MessagePattern({ cmd: 'getVideo' })
  async getVideo(@Body() data: any) {
    return this.videosService.getVideo(data);
  }

  @MessagePattern({ cmd: 'getVideos' })
  async getVideos(@Payload() data?: any) {
    return this.videosService.getVideos(data);
  }

  // test: /videos/get?url=https://jsonplaceholder.typicode.com/todos/1
  // @Get('get')
  // async get(@Query('url') url: string): Promise<any[]> {
  //   return this.videosService.get(url);
  // }

  // @Get('error')
  // async error(): Promise<any> {
  //   return this.videosService.error();
  // }
}
