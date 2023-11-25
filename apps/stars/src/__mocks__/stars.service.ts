import { starStub } from '../../test/stubs/star.stub';

export const StarsService = jest.fn().mockReturnValue({
  createStar: jest.fn().mockResolvedValue(starStub()),
  updateStar: jest.fn().mockResolvedValue(starStub()),
  deleteStar: jest.fn().mockResolvedValue(null),
  findAll: jest.fn().mockResolvedValue([starStub()]),
  findById: jest.fn().mockResolvedValue(starStub()),
  findStarById: jest.fn().mockResolvedValue(starStub()),
});
