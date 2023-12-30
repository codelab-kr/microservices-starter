import { postStub } from '../../test/stubs/post.stub';

export const PostsService = jest.fn().mockReturnValue({
  createPost: jest.fn().mockResolvedValue(postStub()),
  updatePost: jest.fn().mockResolvedValue(postStub()),
  deletePost: jest.fn().mockResolvedValue(null),
  findAll: jest.fn().mockResolvedValue([postStub()]),
  findById: jest.fn().mockResolvedValue(postStub()),
  findPostById: jest.fn().mockResolvedValue(postStub()),
});
