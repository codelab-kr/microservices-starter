import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { User } from '../../models/user';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {}
