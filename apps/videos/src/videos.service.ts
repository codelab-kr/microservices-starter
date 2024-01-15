import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import { VideosMessage } from '@app/common';

@Injectable()
export class VideosService {
  // httpService: any;
  constructor(private readonly videosRepository: VideosRepository) {}

  async createVideo(data: any) {
    const result = await this.videosRepository.create(data);
    return result;
  }

  async getVideoById(_id: string) {
    const video = await this.videosRepository.findOne({ _id });
    if (!video) {
      throw new UnprocessableEntityException(VideosMessage.NOT_FOUND_VIDEO);
    }
    return video;
  }

  async getVideos(data: any) {
    const videos = await this.videosRepository.find(data);
    return videos;
  }

  // async get(url: string) {
  //   return this.httpService.get(url);
  // }

  // async error() {
  //   throw new Error('Invalid credentials.');
  // throw new RpcException('Invalid credentials.');
  // throw new HttpException('Not Found.', 404);
  // throw new HttpVersionNotSupportedException();
  // throw new NotFoundException();
}
