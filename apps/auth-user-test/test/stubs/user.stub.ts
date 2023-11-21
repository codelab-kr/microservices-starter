import { User } from '../../src/user.entity';

export const userStub = (): User => {
  return {
    id: 1,
    firstName: 'Tei',
    lastName: 'Lee',
    isActive: true,
  };
};
