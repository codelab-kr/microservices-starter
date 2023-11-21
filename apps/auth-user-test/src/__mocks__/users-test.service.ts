import { userStub } from '../../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(null),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findById: jest.fn().mockResolvedValue(userStub()),
  findUserById: jest.fn().mockResolvedValue(userStub()),
});
