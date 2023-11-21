import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { CoffeeMenuService } from '../coffee-menu/coffee-menu.service';
import { Repository } from '../repository/Repository';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private storage: Repository<OrderDto>,
    private coffeeMenuService: CoffeeMenuService,
  ) {}

  getOrders() {
    const orders = this.storage.getAll();
    if (orders.length === 0) {
      return `주문 내역이 없습니다`;
    }
    return orders;
  }

  getOrder(id: string) {
    return this.storage.getOne(id);
  }

  createOrder(orderData: Pick<OrderDto, 'ice' | 'name' | 'count'>) {
    const menus = this.coffeeMenuService.getMenus();
    const orderedMenu = menus.find((menu) => menu.name === orderData.name);
    if (typeof orderedMenu === 'undefined') {
      throw new Error(
        `메뉴에 없는 커피입니다. ${menus.map(
          (menu) => menu.name,
        )}에서 골라주세요.`,
      );
    }
    if (orderedMenu.ice !== orderData.ice) {
      throw new Error(
        `이 메뉴는 ${orderData.ice ? 'ice' : 'hot'}(으)로 주문하실 수 없어요`,
      );
    }
    const order = new OrderDto();
    order.id = uuidv4();
    order.name = orderData.name;
    order.price = orderedMenu.price;
    order.ice = orderData.ice;
    order.count = orderData.count;
    return this.storage.save(order);

    // return this.storage.save({
    //   ...orderData,
    //   id: uuidv4(),
    //   price: orderedMenu.price,
    // });
  }
}
