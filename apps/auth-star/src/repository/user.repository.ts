import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CustomRepository } from '../../../../libs/common/src/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
