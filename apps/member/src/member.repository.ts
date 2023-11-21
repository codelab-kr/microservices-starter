import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CustomRepository } from '../../../libs/common/src/database/typeorm-ex.decorator';

@CustomRepository(Member)
export class MemberRepository extends Repository<Member> {}
