import { userStub } from '../../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue({
    generatedMaps: [],
    raw: [],
    affected: 1,
  }),
  deleteUser: jest.fn().mockResolvedValue({
    generatedMaps: [],
    raw: [],
    affected: 1,
  }),
  getUsers: jest.fn().mockResolvedValue([userStub()]),
  getUserByEmail: jest.fn().mockResolvedValue(userStub()),
  getUserById: jest.fn().mockResolvedValue(userStub()),
  validateUser: jest.fn().mockResolvedValue(userStub()),
  getOrSaveUser: jest.fn().mockResolvedValue(userStub()),
});
