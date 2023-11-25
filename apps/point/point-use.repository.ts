import { Repository } from 'typeorm';
import { CustomRepository } from '../../libs/common/src/typeorm-ex/typeorm-ex.decorator';
import { PointUse } from './point-use.entity';

@CustomRepository(PointUse)
export class PointUserepository extends Repository<PointUse> {}
