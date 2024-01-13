import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';

import { NATS_SERVICE, NatsClientService } from '@app/common';
import { HistoryService } from './history.service';

@Module({
  controllers: [HistoryController],
  providers: [
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
    HistoryService,
  ],
})
export class HistoryModule {}
