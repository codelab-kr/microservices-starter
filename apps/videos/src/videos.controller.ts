import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoRequest } from './dto/create-video.request';
import { JwtAuthGuard } from '@app/common';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createVideo(@Body() request: CreateVideoRequest, @Req() req: any) {
    console.log('req.cookies?.Authentication', req.cookies?.Authentication);
    return this.videosService.create(request, req.cookies?.Authentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getVideos() {
    return this.videosService.getVideos();
  }
}
