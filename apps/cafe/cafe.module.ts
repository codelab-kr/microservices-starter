import { Module } from '@nestjs/common';
import { CoffeeMenuModule } from './src/coffee-menu/coffee-menu.module';
import { OrderModule } from './src/order/order.module';
import { Repository } from './src/repository/Repository';

@Module({
  imports: [CoffeeMenuModule, OrderModule],
  providers: [Repository],
})
export class AppModule {}
