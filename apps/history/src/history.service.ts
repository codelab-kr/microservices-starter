import { Injectable, Logger } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { CreateHistoryInput } from './dto/input/create-history.input';
import { Types } from 'mongoose';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);
  constructor(private readonly historyRepository: HistoryRepository) {}

  async create(data: CreateHistoryInput) {
    const videoId = new Types.ObjectId(data.videoId);
    return this.historyRepository.create({ ...data, videoId });
  }

  async getHistory(data: any) {
    return this.historyRepository.find(data);
  }
}
