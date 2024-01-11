import { Types } from 'mongoose';
import { Video } from '../../src/models/video';

export const videoStub = (): Video => {
  return {
    _id: '654a46e254fec769d7f5754e' as unknown as Types.ObjectId,
    title: 'title',
    type: 'type',
    path: 'url',
    description: 'thumbnail',
    userId: 'userId',
  };
};
