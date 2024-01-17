import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NATS_SERVICE, NatsClientService } from '@app/common';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.sevice';

// import { CreateUserDto } from '../../src/users/dtos/create-user.dto';
// import { userStub } from '../../../users/test/stubs/user.stub';

// e2e tests: 테스트 데이터베이스를 사용하여 end-to-end 테스트를 수행하기 위해서는
// 수신대상이 되는 마이크로서비스를 테스트 데이터베이스에 연결한 후 테스트를 수행해야 한다.
describe('Users Microservice (e2e)', () => {
  // const user = {
  //   email: userStub().email,
  //   password: userStub().password,
  //   username: userStub().username,
  // };
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: NATS_SERVICE,
          useClass: NatsClientService,
        },
        UsersService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    // await app.listen(4030, 'localhost'); // 테스트 데이터베이스에 연결된 마이크로서비스를 실행한다.
  });

  //   it('Create [POST /users/signup]', async () => {
  //     return request(app.getHttpServer())
  //       .post('signup')
  //       .send(user as CreateUserDto)
  //       .expect(201)
  //       .then(({ body }) => {
  //         expect(body).toEqual(user);
  //       });
  //   });

  it('Get all users [GET /users]', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  //   it('Get one user [GET /users/:id]', async () => {
  //     return request(app.getHttpServer())
  //       .post('get-user-by-id')
  //       .send(userStub().id)
  //       .expect(200)
  //       .then(({ body }) => {
  //         expect(body).toBeDefined();
  //       });
  //   });

  //   it('Delete one user [DELETE /users/:id]', async () => {
  //     return request(app.getHttpServer())
  //       .post('delete-user')
  //       .send(userStub().id)
  //       .expect(200);
  //   });

  afterAll(async () => {
    await app.close();
  });
});
