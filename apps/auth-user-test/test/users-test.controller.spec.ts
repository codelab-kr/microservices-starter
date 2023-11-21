import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users.controller';
import { UsersService } from '../src/users.service';
import { userStub } from './stubs/user.stub';
import { UserCreateRequestDto } from '../src/dto/user-create-request.dto';
import { User } from '../src/user.entity';

jest.mock('../src/users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.findOne(userStub().id);
      });

      test('then it should call usersService', () => {
        expect(usersService.findById).toHaveBeenCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });

    describe('findAll', () => {
      describe('when getUsers is called ', () => {
        let users: User[];

        beforeEach(async () => {
          users = await usersController.findAll();
        });

        test('then it should call usersService', () => {
          expect(usersService.findAll).toHaveBeenCalled();
        });

        test('then it should return users', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let request: UserCreateRequestDto;

        beforeEach(async () => {
          request = {
            firstName: userStub().firstName,
            lastName: userStub().lastName,
            isActive: userStub().isActive,
          };
          user = await usersController.create(request);
        });

        test('then it should call usersService', async () => {
          expect(usersService.createUser).toHaveBeenCalledWith(request);
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});
