import { Star } from '../../src/star.entity';

export const starStub = (): Star => {
  return {
    id: 1,
    firstName: 'Tei',
    lastName: 'Lee',
    isActive: true,
  };
};
