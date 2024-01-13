import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { History } from './models/history';

@Injectable()
export class HistoryRepository extends AbstractRepository<History> {
  protected readonly logger = new Logger(HistoryRepository.name);
  constructor(
    @InjectModel(History.name) videoModel: Model<History>,
    @InjectConnection() connection: Connection,
  ) {
    super(videoModel, connection);
  }
}
