import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Video } from './schemas/video.schema';

@Injectable()
export class VideosRepository extends AbstractRepository<Video> {
  protected readonly logger = new Logger(VideosRepository.name);
  constructor(
    @InjectModel(Video.name) videoModel: Model<Video>,
    @InjectConnection() connection: Connection,
  ) {
    super(videoModel, connection);
  }
}
