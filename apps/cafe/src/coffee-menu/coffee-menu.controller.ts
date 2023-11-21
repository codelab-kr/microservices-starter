import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoffeeMenuService } from './coffee-menu.service';
import { CoffeeMenuDto } from './dto/coffee-menu.dto';

@Controller('menus')
export class CoffeeMenuController {
  constructor(private coffeeMenuService: CoffeeMenuService) {}

  @Get()
  getMenus() {
    this.coffeeMenuService.getMenus();
  }

  @Get(':id')
  getMenu(@Param('id') id: string) {
    return this.coffeeMenuService.getMenu(id);
  }

  @Post('create')
  createCoffeeMenu(@Body() menuData: Omit<CoffeeMenuDto, 'id'>) {
    return this.coffeeMenuService.createMenu(menuData);
  }
}
