import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { VideosRepository } from './videos.repository';

import { VideosMessage } from '@app/common';
import { CreateVideoRequest } from './dto/create-video.request';

@Injectable()
export class VideosService {
  httpService: any;
  constructor(private readonly videosRepository: VideosRepository) {}

  async createVideo(data: CreateVideoRequest) {
    await this.videosRepository.create(data);
  }

  async getVideo({ _id }) {
    const video = await this.videosRepository.find({ _id });
    if (video?.length === 0) {
      throw new UnprocessableEntityException(VideosMessage.NOT_FOUND_VIDEO);
    }
    console.log(video);
    return video;
  }

  async getVideos() {
    return this.videosRepository.find({});
  }

  async get(url: string) {
    return this.httpService.get(url);
  }

  async error() {
    throw new Error('Invalid credentials.');
    // throw new RpcException('Invalid credentials.');
    // throw new HttpException('Not Found.', 404);
    // throw new HttpVersionNotSupportedException();
    // throw new NotFoundException();
  }
}
