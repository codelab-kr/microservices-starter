import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/user.schema';
import { CreateUserInput } from '../dto/input/create-user.input';
import { UpdateUserInput } from '../dto/input/update-user.input';

// 순서
// 1. jest.mock() - 테스팅을 위해 모킹할 서비스 생성 <- users/__mocks__ 폴더에 서비스 목킹 생성 <- users/test/stubs/유저 스텁 생성
// 2. beforeEach() - 컨트롤러 테스트를 위한 테스팅 모듈(컨트롤러, 프로바이더(서비스) 세팅 ) 생성 & 컴파일
// 3. describe() - 엔드포인트 별로 테스트 케이스 생성
// beforeEach() 로 테스트할 메소드를 실행하고 test() 에서는 해당 실행결과를 기대되는 상태나 값과 비교한다.
// 컨트롤러는 매칭되는 서비스를 파라미터와 함께 잘 불러오는지 확인하고 결과값이 맞는지 확인한다.
jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
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
