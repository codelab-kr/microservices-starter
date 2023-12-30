import { Post } from '../../src/models/post';

export const postStub = (): Post => {
  return {
    id: 1,
    title: 'Tei',
    content: 'Lee',
    userId: 1,
  };
};
