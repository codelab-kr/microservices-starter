import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('video_created')
  async handleVideoCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.historyService.create(data);
    this.rmqService.ack(context);
  }
}
