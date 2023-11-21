import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Repository } from '../repository/Repository';
import { OrderDto } from './dto/order.dto';
import { COFFEE_REPOSITORY, ORDER_REPOSITORY } from '../../constants';
import { CoffeeMenuService } from '../coffee-menu/coffee-menu.service';
import { CoffeeMenuDto } from '../coffee-menu/dto/coffee-menu.dto';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: ORDER_REPOSITORY, useValue: new Repository<OrderDto>() },
    CoffeeMenuService,
    { provide: COFFEE_REPOSITORY, useValue: new Repository<CoffeeMenuDto>() },

  ],
})
export class OrderModule {}
