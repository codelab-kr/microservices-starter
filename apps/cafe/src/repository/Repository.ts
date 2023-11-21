import { Injectable } from '@nestjs/common';
import { BaseDto } from './dto/base.dto';

@Injectable()
export class Repository<T extends BaseDto> {
  private items: T[] = [];

  getOne(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }

  save(instance: T): T {
    this.items.push(instance);
    return instance;
  }
}
