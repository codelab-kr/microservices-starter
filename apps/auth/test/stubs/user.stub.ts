import { User } from '../../src/users/schemas/user.schema';
import { Types } from 'mongoose';

export const userStub = (): User => {
  return {
    _id: '654a46e254fec769d7f5754e' as unknown as Types.ObjectId,
    email: 'test@test.com',
    password: 'password',
    username: 'test',
  };
};
