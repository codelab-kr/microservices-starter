import { Module } from '@nestjs/common';
import { COFFEE_REPOSITORY } from '../../constants';
import { Repository } from '../repository/Repository';
import { CoffeeMenuController } from './coffee-menu.controller';
import { CoffeeMenuService } from './coffee-menu.service';
import { CoffeeMenuDto } from './dto/coffee-menu.dto';

@Module({
  controllers: [CoffeeMenuController],
  providers: [
    CoffeeMenuService,
    { provide: COFFEE_REPOSITORY, useValue: new Repository<CoffeeMenuDto>() },
  ],
})
export class CoffeeMenuModule {}
