import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VIDEOS_SERVICE, AUTH_SERVICE } from './constans/services';
import { lastValueFrom } from 'rxjs';
import { CreateVideoRequest } from 'apps/videos/src/dto/create-video.request';
import { Response } from 'express';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(VIDEOS_SERVICE) private readonly videosClient: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  async createVideo(data: CreateVideoRequest) {
    await lastValueFrom(this.videosClient.emit('create-video', data));
  }

  async login(user: any, res: Response) {
    await lastValueFrom(this.authClient.emit('login', user));
    return res.send(user);
  }
}
