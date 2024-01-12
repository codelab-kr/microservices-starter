import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosResolver } from './videos.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [
    VideosResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
    VideosService,
  ],
})
export class VideosModule {}
