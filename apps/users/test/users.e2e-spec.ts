import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users.module';
import { CreateUserDto } from '../src/dtos/create.user.dto';
import { userStub } from './stubs/user.stub';
import { DataSource } from 'typeorm';

describe('Users - /users (e2e)', () => {
  const user = {
    email: userStub().email,
    password: userStub().password,
    username: userStub().username,
  };

  const savedUser: any = {};

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize();
    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      dataSource.destroy();
    }
    await app.close();
  });

  it('Create [POST /users]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResult } = user;
    return request(app.getHttpServer())
      .post('/users')
      .send(user as CreateUserDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining(userResult));
        savedUser.id = body.id;
      });
  });

  it('Get all users [GET /users]', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', async () => {
    return request(app.getHttpServer())
      .get(`/users/${savedUser.id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Delete one user [DELETE /users/:id]', async () => {
    return request(app.getHttpServer())
      .delete(`/users/${savedUser.id}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
