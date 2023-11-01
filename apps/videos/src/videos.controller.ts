import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoRequest } from './dto/create-video.request';
import { JwtAuthGuard } from '@app/common';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVideo(@Body() request: CreateVideoRequest, @Req() req: any) {
    return this.videosService.create(request, req.cookies?.Authentication);
  }

  // test: /videos?url=https://jsonplaceholder.typicode.com/todos/1
  @Get()
  async get(@Query('url') url: string): Promise<any[]> {
    return this.videosService.get(url);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getVideos() {
    return this.videosService.getVideos();
  }
}
