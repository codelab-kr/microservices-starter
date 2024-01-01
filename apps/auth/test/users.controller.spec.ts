import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { CreateUserInput } from '../src/users/dtos/input/create-user.input';
import { UpdateUserInput } from '../src/users/dtos/input/update-user.input';

jest.mock('../src/users/users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub()._id.toString());
        console.log('userStub()._id.toString()', userStub()._id.toString());
        console.log('user', user);
      });

      test('then it should call usersService', () => {
        expect(usersService.getUser).toHaveBeenCalledWith(
          userStub()._id.toString(),
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let request: CreateUserInput;

      beforeEach(async () => {
        request = {
          email: userStub().email,
          password: userStub().password,
          username: userStub().username,
        };
        user = await usersController.createUser(request);
      });

      test('then it should call usersService', async () => {
        expect(usersService.createUser).toHaveBeenCalledWith({
          ...request,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let request: UpdateUserInput;

      beforeEach(async () => {
        request = {
          _id: userStub()._id.toString(),
          password: 'password2',
          username: 'test2',
        };
        user = await usersController.updateUser(
          userStub()._id.toString(),
          request,
        );
        console.log(user);
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.deleteUser(userStub()._id.toString());
      });

      test('then it should call usersService', () => {
        expect(usersService.deleteUser).toHaveBeenCalledWith({
          _id: userStub()._id.toString(),
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
