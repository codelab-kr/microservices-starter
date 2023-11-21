import { Test, TestingModule } from '@nestjs/testing';
import { COFFEE_REPOSITORY } from '../constants';
import { mockMenus } from './mocks/menus';
import { Repository } from '../src/repository/Repository';
import { CoffeeMenuService } from '../src/coffee-menu/coffee-menu.service';
import { CoffeeMenuDto } from '../src/coffee-menu/dto/coffee-menu.dto';

describe('CoffeeMenuService', () => {
  let service: CoffeeMenuService;
  let repository: Repository<CoffeeMenuDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeMenuService,
        {
          provide: COFFEE_REPOSITORY,
          useValue: new Repository<CoffeeMenuDto>(),
        },
      ],
    }).compile();

    service = module.get<CoffeeMenuService>(CoffeeMenuService);
    repository = module.get<Repository<CoffeeMenuDto>>(COFFEE_REPOSITORY);
  });

  describe('getMenus', () => {
    it('get all menus', () => {
      jest.spyOn(repository, 'getAll').mockImplementationOnce(() => mockMenus);

      const result = service.getMenus();
      expect(result).toEqual(expect.arrayContaining(mockMenus));
    });

    it('returns text', () => {
      expect(() => service.getMenus()).toThrow(
        new Error(`아직 카페가 오픈 전이에요. 잠시 후 다시 주문해주세요.`),
      );
    });
  });

  describe('create', () => {
    it('create menu', () => {
      const newMenu = service.createMenu({
        name: '히비스커스티',
        price: 4500,
        ice: true,
        hot: true,
      });
      const result = service.getMenu(newMenu.id);
      expect(result).toMatchObject(newMenu);
    });
  });
});
