import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UsersService } from '../src/users.service';
import { UsersRepository } from '../src/users.repository';
import { UserCreateRequestDto } from '../src/dto/user-create-request.dto';
import { UserUpdateRequestDto } from '../src/dto/user-update-request.dto';
import { User } from '../src/user.entity';
import { userStub } from './stubs/user.stub';

describe('UsersService (Stub)', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;

      const request = new UserCreateRequestDto();
      request.firstName = userStub().firstName;
      request.lastName = userStub().lastName;
      request.isActive = userStub().isActive;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(UsersRepository.prototype, 'save')
          .mockResolvedValue(userStub());
        user = await usersService.createUser(request);
      });

      test('then it should call userRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith(request);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(UsersRepository.prototype, 'find')
          .mockResolvedValue([userStub()]);
        users = await usersService.findAll();
      });

      test('then it should call userRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toStrictEqual([userStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(UsersRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(usersService.findById(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call userRepository', async () => {
        try {
          await usersService.findById(id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        }
      });

      describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', () => {
        let user: User;
        let findSpy: jest.SpyInstance;
        const id = 1;

        beforeEach(async () => {
          findSpy = jest
            .spyOn(UsersRepository.prototype, 'findOne')
            .mockResolvedValue(userStub());
          user = await usersService.findById(id);
        });

        test('then it should call userRepository', async () => {
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        });

        test('then it should return a user', async () => {
          expect(user).toEqual(userStub());
        });
      });

      describe('updateUser', () => {
        describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
          let findSpy: jest.SpyInstance;
          const requestDto: UserUpdateRequestDto = {
            id: 1,
            isActive: false,
          };

          beforeEach(async () => {
            findSpy = jest
              .spyOn(UsersRepository.prototype, 'findOne')
              .mockResolvedValue(undefined);
          });

          test('then it should return NotFoundException', async () => {
            await expect(usersService.updateUser(requestDto)).rejects.toThrow(
              NotFoundException,
            );
          });

          test('then it should call userRepository', async () => {
            try {
              await usersService.findById(requestDto.id);
            } catch (error) {
              expect(findSpy).toHaveBeenCalledWith({
                where: { id: requestDto.id },
              });
            }
          });
        });

        describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', () => {
          let user: User;
          let findSpy: jest.SpyInstance;
          let saveSpy: jest.SpyInstance;
          const request: UserUpdateRequestDto = {
            id: 1,
            isActive: false,
          };

          beforeEach(async () => {
            findSpy = jest
              .spyOn(UsersRepository.prototype, 'findOne')
              .mockResolvedValue(userStub());
            saveSpy = jest
              .spyOn(UsersRepository.prototype, 'save')
              .mockResolvedValue(userStub());
            user = await usersService.updateUser(request);
          });

          test('then it should call userRepository', async () => {
            expect(findSpy).toHaveBeenCalledWith({ where: { id } });
            expect(saveSpy).toHaveBeenCalledWith({
              ...userStub(),
              ...request,
            });
          });

          test('then it should return a user', async () => {
            expect(user).toEqual(userStub());
          });
        });
      });

      describe('deleteUser', () => {
        describe('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', () => {
          const id = 1;
          let deleteSpy: jest.SpyInstance;
          let result: void;

          beforeEach(async () => {
            deleteSpy = jest
              .spyOn(UsersRepository.prototype, 'delete')
              .mockResolvedValue({} as DeleteResult);
            result = await usersService.deleteUser(id);
          });

          test('then it should call userRepository', async () => {
            expect(deleteSpy).toHaveBeenCalledWith(id);
          });

          test('then it should return undefined', () => {
            expect(result).toBeUndefined();
          });
        });
      });
    });
  });
});
