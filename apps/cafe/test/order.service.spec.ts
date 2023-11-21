import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from '../src/repository/Repository';
import { OrderService } from '../src/order/order.service';
import { OrderDto } from '../src/order/dto/order.dto';
import { mockOrders } from './mocks/orders';
import { mockMenus } from './mocks/menus';
import { CoffeeMenuService } from '../src/coffee-menu/coffee-menu.service';
import { CoffeeMenuDto } from '../src/coffee-menu/dto/coffee-menu.dto';
import { COFFEE_REPOSITORY, ORDER_REPOSITORY } from '../constants';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<OrderDto>;
  let coffeeRepository: Repository<CoffeeMenuDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY,
          useValue: new Repository<OrderDto>(),
        },
        CoffeeMenuService,
        {
          provide: COFFEE_REPOSITORY,
          useValue: new Repository<CoffeeMenuDto>(),
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<OrderDto>>(ORDER_REPOSITORY);
    coffeeRepository = module.get<Repository<CoffeeMenuDto>>(COFFEE_REPOSITORY);
  });

  describe('getOrders', () => {
    it('get all orders', () => {
      jest
        .spyOn(orderRepository, 'getAll')
        .mockImplementationOnce(() => mockOrders);

      const result = service.getOrders();
      expect(result).toEqual(expect.arrayContaining(mockOrders));
    });

    it('returns text', () => {
      const result = service.getOrders();
      expect(result).toEqual(`주문 내역이 없습니다`);
    });
  });

  describe('create', () => {
    it('메뉴에 없는 커피를 주문하면 error throw', () => {
      jest
        .spyOn(coffeeRepository, 'getAll')
        .mockImplementation(() => mockMenus);

      expect(() =>
        service.createOrder({
          name: '히비스커스티',
          ice: false,
          count: 1,
        }),
      ).toThrow(
        new Error(
          `메뉴에 없는 커피입니다. ${mockMenus.map(
            (menu) => menu.name,
          )}에서 골라주세요.`,
        ),
      );
    });

    it('ice가 안되는 음료에 ice로 주문하면 에러', () => {
      jest
        .spyOn(coffeeRepository, 'getAll')
        .mockImplementation(() => mockMenus);
      expect(() =>
        service.createOrder({
          name: '토피넛라떼',
          ice: true,
          count: 1,
        }),
      ).toThrow(new Error(`이 메뉴는 ice(으)로 주문하실 수 없어요`));
    });

    it('정상적으로 주문', () => {
      jest
        .spyOn(coffeeRepository, 'getAll')
        .mockImplementation(() => mockMenus);
      const newOrder = service.createOrder({
        name: '토피넛라떼',
        ice: false,
        count: 1,
      });

      const result = service.getOrder(newOrder.id);
      expect(result).toMatchObject(newOrder);
    });
  });
});
