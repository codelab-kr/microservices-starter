import { Controller, Get, Render } from '@nestjs/common';
import { HistoryService } from './history.service';

import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '@app/common';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @Render('history')
  async list(@CurrentUser() user: any) {
    const history = await lastValueFrom(
      this.historyService.getHistory(user.id),
    );
    return { history, user };
  }
}
