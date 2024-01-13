import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateHistoryInput } from './dto/input/create-history.input';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @MessagePattern({ cmd: 'getHistory' })
  async getHistory(@Payload() data: any) {
    return this.historyService.getHistory(data);
  }

  @EventPattern('videoViewed')
  async handleVideoCreated(@Payload() data: CreateHistoryInput) {
    console.log('handleVideoCreated', data);
    this.historyService.create(data);
  }
}
