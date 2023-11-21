import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CustomRepository } from '../../../../libs/common/src/database/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
