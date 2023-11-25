import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { Star } from './star.entity';

@CustomRepository(Star)
export class StarsRepository extends Repository<Star> {}
