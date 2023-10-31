import { Controller, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('video_created')
  @UseGuards(JwtAuthGuard)
  async handleVideoCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.historyService.create(data);
    this.rmqService.ack(context);
  }
}
