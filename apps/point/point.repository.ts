import { Repository } from 'typeorm';
import { Point } from './point.entity';
import { CustomRepository } from '../../libs/common/src/database/typeorm-ex.decorator';

@CustomRepository(Point)
export class PointRepository extends Repository<Point> {}
