import { HISTORY_SERVICE, METADATA_SERVICE } from './constans/services';
import { Inject, Injectable } from '@nestjs/common';
import { CreateVideoRequest } from './dto/create-video.request';
import { VideosRepository } from './videos.repository';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class VideosService {
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly httpService: HttpService,
    @Inject(HISTORY_SERVICE) private historyClient: ClientProxy,
    @Inject(METADATA_SERVICE) private metadataClient: ClientProxy,
  ) {}

  async create(request: CreateVideoRequest, authentication: string) {
    const session = await this.videosRepository.startTransaction();
    try {
      const video = await this.videosRepository.create(request, { session });
      await lastValueFrom(
        this.metadataClient.emit('video_created', {
          request,
          Authentication: authentication,
        }),
      );
      await lastValueFrom(
        this.historyClient.emit('video_created', {
          request,
          Authentication: authentication,
        }),
      );
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
