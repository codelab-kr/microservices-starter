import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery, Connection } from 'mongoose';
import { userStub } from './stubs/user.stub';
import { UserModel } from './support/user.model';
import { UsersRepository } from '../src/users/users.repository';
import { User } from '../src/users/schemas/user.schema';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
          {
            provide: 'DatabaseConnection',
            useClass: Connection,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        userId: userStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne');
          user = await usersRepository.findOne(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(
            userFilterQuery,
            {},
            {
              lean: true,
            },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let users: User[];

        beforeEach(async () => {
          jest.spyOn(userModel, 'find');
          users = await usersRepository.find(userFilterQuery);
        });

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalledWith(
            userFilterQuery,
            {},
            {
              lean: true,
            },
          );
        });

        test('then it should return a user', () => {
          expect(users).toEqual([userStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
            userFilterQuery,
            userStub(),
            { new: true, lean: true },
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
          {
            provide: 'DatabaseConnection',
            useClass: Connection,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        // let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save');
          // constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = await usersRepository.create(userStub());

          console.log('user', user);
        });

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          // expect(constructorSpy).toHaveBeenCalledWith(userStub());
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});
