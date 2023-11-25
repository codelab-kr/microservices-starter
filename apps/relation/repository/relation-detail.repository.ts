import { Repository } from 'typeorm';
import { RelationDetail } from '../relation-detail.entity';
import { CustomRepository } from '../../../libs/common/src/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(RelationDetail)
export class RelationDetailRepository extends Repository<RelationDetail> {}
