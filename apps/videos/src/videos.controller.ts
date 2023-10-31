import { Body, Controller, Post, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoRequest } from './dto/create-video.request';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async createVideo(@Body() request: CreateVideoRequest) {
    return this.videosService.create(request);
  }

  @Get()
  async getVideos() {
    return this.videosService.getVideos();
  }
}
