import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Post('create')
  createOrder(@Body() orderData: Pick<OrderDto, 'ice' | 'name' | 'count'>) {
    return this.orderService.createOrder(orderData);
  }
}
