import { Repository } from 'typeorm';

import { CustomRepository } from '../../../libs/common/src/database/typeorm-ex.decorator';
import { User } from './user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {}
