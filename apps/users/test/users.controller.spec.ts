import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../src/models/user';
import { UsersController } from '../src/users.controller';
import { UsersService } from '../src/users.service';
import { CreateUserDto } from '../src/dtos/create.user.dto';
import { UpdateUserDto } from '../src/dtos/update.user.dto';
import { LoginUserRequest } from '../src/dtos/login.user.dto';
import { userStub } from './stubs/user.stub';
import { UpdateResult } from 'typeorm';

jest.mock('../src/users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  const updateResult: UpdateResult = {
    generatedMaps: [],
    raw: [],
    affected: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let request: CreateUserDto;

      beforeEach(async () => {
        request = {
          email: userStub().email,
          password: userStub().password,
          username: userStub().username,
        };
        user = await usersController.createUser(request);
      });

      test('then it should call usersService', async () => {
        expect(usersService.createUser).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(expect.objectContaining(request));
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call usersService', async () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('validateUser', () => {
    describe('when validateUser is called', () => {
      let user: User;
      let request: LoginUserRequest;

      beforeEach(async () => {
        request = {
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.validateUser(request);
      });

      test('then it should call usersService', async () => {
        expect(usersService.validateUser).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(expect.objectContaining(request));
      });
    });
  });

  describe('getUserByEmail', () => {
    describe('when getUserByEmail is called', () => {
      let user: User;
      let email: string;

      beforeEach(async () => {
        email = userStub().email;
        user = await usersController.getUserByEmail(email);
      });

      test('then it should call usersService', async () => {
        expect(usersService.getUserByEmail).toHaveBeenCalledWith(email);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(expect.objectContaining({ email }));
      });
    });
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;
      let id: string;

      beforeEach(async () => {
        id = userStub().id;
        user = await usersController.getUserById(id);
      });

      test('then it should call usersService', async () => {
        expect(usersService.getUserById).toHaveBeenCalledWith(id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(expect.objectContaining({ id }));
      });
    });
  });

  describe('getOrSaveUser', () => {
    describe('when getOrSaveUser is called', () => {
      let user: User;
      let request: CreateUserDto;

      beforeEach(async () => {
        request = {
          email: userStub().email,
          password: userStub().password,
          username: userStub().username,
        };
        user = await usersController.getOrSaveUser(request);
      });

      test('then it should call usersService', async () => {
        expect(usersService.getOrSaveUser).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(expect.objectContaining(request));
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let request: UpdateUserDto;

      beforeEach(async () => {
        request = {
          id: userStub().id,
          password: userStub().password,
          username: userStub().username,
        };
        user = await usersController.updateUser(request);
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(updateResult);
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.deleteUser(userStub().id);
      });

      test('then it should call usersService', () => {
        expect(usersService.deleteUser).toHaveBeenCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(updateResult);
      });
    });
  });
});
