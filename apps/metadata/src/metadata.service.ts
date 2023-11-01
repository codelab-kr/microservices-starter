import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  async create(data: any) {
    this.logger.log('Metadata....', data);
  }
}
