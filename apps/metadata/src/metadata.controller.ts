import { Controller, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';

@Controller()
export class MetadataController {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('video_created')
  @UseGuards(JwtAuthGuard)
  async handleVideoCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.metadataService.create(data);
    this.rmqService.ack(context);
  }
}
