import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosResolver } from './videos.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';

@Module({
  controllers: [VideosController],
  providers: [
    VideosResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
  ],
})
export class VideosModule {}
