import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../repository/Repository';
import { CoffeeMenuDto } from './dto/coffee-menu.dto';
import { COFFEE_REPOSITORY } from '../../constants';

@Injectable()
export class CoffeeMenuService {
  constructor(
    @Inject(COFFEE_REPOSITORY) private storage: Repository<CoffeeMenuDto>,
  ) {}

  getMenus() {
    const menus = this.storage.getAll();
    if (menus.length === 0) {
      throw new Error(`아직 카페가 오픈 전이에요. 잠시 후 다시 주문해주세요.`);
    }
    return menus;
  }

  getMenu(id: string) {
    return this.storage.getOne(id);
  }

  createMenu(menuData: Omit<CoffeeMenuDto, 'id'>) {
    const menu = new CoffeeMenuDto();
    menu.id = uuidv4();
    menu.name = menuData.name;
    menu.price = menuData.price;
    menu.ice = menuData.ice;
    menu.hot = menuData.hot;
    return this.storage.save(menu);

    // return this.storage.save({ ...menuData, id: uuidv4() });
  }
}
