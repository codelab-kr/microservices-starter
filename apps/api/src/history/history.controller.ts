import { Controller, Get, Res } from '@nestjs/common';
import { HistoryService } from './history.service';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '@app/common';
import { Response } from 'express';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async list(@Res() res: Response, @CurrentUser() user?: any) {
    if (!user) {
      return res.redirect('/login');
    }
    const history = await lastValueFrom(
      this.historyService.getHistory(user.id),
    );
    res.render('history', { isHistory: true, history, user });
  }
}
