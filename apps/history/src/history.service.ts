import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  async create(data: any) {
    this.logger.log('History....', data);
  }
}
