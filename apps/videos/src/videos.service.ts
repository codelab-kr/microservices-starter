import { Inject, Injectable } from '@nestjs/common';
import { CreateVideoRequest } from './dto/create-video.request';
import { VideosRepository } from './videos.repository';
import { HISTORY_SERVICE } from './constans/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
  ) {}

  async create(request: CreateVideoRequest) {
    const session = await this.videosRepository.startTransaction();
    try {
      console.log('create video');
      const video = await this.videosRepository.create(request, { session });
      console.log('video: ', video);
      await lastValueFrom(
        this.historyClient.emit('video_created', { request }),
      );
      console.log('history created');
      await session.commitTransaction();
      return video;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getVideos() {
    return this.videosRepository.find({});
  }
}
