import { Controller, Post, Inject, Body, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '@app/common';
import { CreateVideoInput } from './dtos/input/create-video.input';

@Controller('videos')
export class VideosController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  CreateVideo(@Body() createVideoDto: CreateVideoInput) {
    return this.natsClient.send({ cmd: 'createVideo' }, createVideoDto);
  }

  @Get()
  getVideos() {
    return this.natsClient.send({ cmd: 'getVideos' }, {});
  }

  @Get(':_id')
  getVideo(@Param('_id') _id: string) {
    return this.natsClient.send({ cmd: 'getVideo' }, { _id });
  }
}
