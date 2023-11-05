import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VIDEOS_SERVICE } from './constans/services';
import { lastValueFrom } from 'rxjs';
import { CreateVideoRequest } from 'apps/videos/src/dto/create-video.request';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(VIDEOS_SERVICE) private readonly videosClient: ClientProxy,
  ) {}

  async createVideo(data: CreateVideoRequest) {
    await lastValueFrom(this.videosClient.emit('create-video', data));
  }
}
