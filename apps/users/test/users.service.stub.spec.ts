import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users.service';
import { UsersRepository } from '../src/repositories/users.repository';
import { User } from '../src/models/user';
import { userStub } from './stubs/user.stub';
import { CreateUserDto } from '../src/dtos/create.user.dto';
import { UpdateUserDto } from '../src/dtos/update.user.dto';
import { UnprocessableEntityException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  const updateResult: UpdateResult = {
    generatedMaps: [],
    raw: [],
    affected: 1,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            save: jest.fn().mockResolvedValue(userStub()),
            find: jest.fn().mockResolvedValue([userStub()]),
            findOne: jest.fn().mockResolvedValue(userStub()),
            findOneBy: jest.fn().mockResolvedValue(userStub()),
            update: jest.fn().mockResolvedValue(updateResult),
            softDelete: jest.fn().mockResolvedValue(updateResult),
          },
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);

    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;

      const request: CreateUserDto = {
        email: userStub().email,
        password: userStub().password,
        username: userStub().username,
      };

      beforeEach(async () => {
        usersRepository.findOneBy = jest.fn().mockResolvedValue(null);
        saveSpy = jest.spyOn(usersRepository, 'save');
        // .mockResolvedValue(userStub());
        user = await usersService.createUser(request);
      });

      test('then it should call userRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith({
          ...request,
          password: expect.any(String),
        });
      });

      test('then it should return a user', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = userStub();
        expect(user).toEqual(userWithoutPassword);
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest.spyOn(usersRepository, 'find');
        users = await usersService.getUsers();
      });

      test('then it should call userRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toStrictEqual([userStub()]);
      });
    });
  });

  describe('getUserById', () => {
    describe('If user do not exist, It shuld throw Exception', () => {
      let findSpy: jest.SpyInstance;
      const id = userStub().id;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(usersRepository, 'findOneBy')
          .mockResolvedValue(null);
      });

      test('then it should return NotFoundException', async () => {
        await expect(usersService.getUserById(id)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      test('then it should call userRepository', async () => {
        try {
          await usersService.getUserById(id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({ id });
        }
      });
    });

    describe('If user exists, It shuld return a user', () => {
      let user: User;
      let findSpy: jest.SpyInstance;
      const id = userStub().id;

      beforeEach(async () => {
        findSpy = jest.spyOn(usersRepository, 'findOneBy');
        user = await usersService.getUserById(id);
      });

      test('then it should call userRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({ id });
      });

      test('then it should return a user', async () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('If user do not exist', () => {
      let findSpy: jest.SpyInstance;
      const request: UpdateUserDto = {
        id: userStub().id,
        username: userStub().username,
      };

      beforeEach(async () => {
        findSpy = jest
          .spyOn(usersRepository, 'findOneBy')
          .mockResolvedValue(null);
      });

      test('then it should return UnprocessableEntityException', async () => {
        await expect(usersService.updateUser(request)).rejects.toThrow(
          UnprocessableEntityException,
        );
      });

      test('then it should call usersService', async () => {
        try {
          await usersService.getUserById(request.id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({ id: request.id });
        }
      });
    });

    describe('If user exists. it shuld modify and return a user)', () => {
      let updateResulet: any;
      let findSpy: jest.SpyInstance;
      let saveSpy: jest.SpyInstance;
      let request: UpdateUserDto;

      request = {
        id: userStub().id,
        username: userStub().username,
      };

      beforeEach(async () => {
        findSpy = jest.spyOn(usersRepository, 'findOneBy');
        saveSpy = jest.spyOn(usersRepository, 'update');

        request = { ...userStub(), ...request };
        updateResulet = await usersService.updateUser(request);
      });

      test('then it should call userRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({ id: request.id });
        expect(saveSpy).toHaveBeenCalledWith(request.id, {
          ...request,
          password: expect.any(String),
        });
      });

      test('then it should return a user', async () => {
        expect(updateResulet).toEqual(updateResult);
      });
    });

    describe('deleteUser', () => {
      describe('If user exsists, It should delete a user', () => {
        const id = userStub().id;
        let deleteSpy: jest.SpyInstance;
        let result: UpdateResult;

        beforeEach(async () => {
          deleteSpy = jest.spyOn(usersRepository, 'softDelete');
          result = await usersService.deleteUser(id);
        });

        test('then it should call userRepository', async () => {
          expect(deleteSpy).toHaveBeenCalledWith({ id });
        });

        test('then it should return undefined', () => {
          expect(result).toEqual(updateResult);
        });
      });
    });
  });
});
