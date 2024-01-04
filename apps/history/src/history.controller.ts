import { Controller, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @EventPattern('video_viewed')
  @UseGuards(JwtAuthGuard)
  async handleVideoCreated(@Payload() data: any) {
    this.historyService.create(data);
  }
}
