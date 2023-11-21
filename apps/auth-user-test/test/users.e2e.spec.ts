import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../src/users.module';
import { UserCreateRequestDto } from '../src/dto/user-create-request.dto';
import { User } from '../src/user.entity';

describe('Users - /users (e2e)', () => {
  const user = {
    id: 1,
    firstName: 'FirstName #1',
    lastName: 'LastName #1',
    isActive: true,
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'test',
          password: 'testtest',
          database: 'test',
          entities: [User],
          autoLoadEntities: true,
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user as unknown as UserCreateRequestDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(user);
      });
  });

  it('Get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one user [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  // it('Update one user [PUT /users/:id]', () => {
  //   return request(app.getHttpServer())
  //     .put('/users/1')
  //     .send(user as unknown as UserCreateRequestDto)
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toEqual(user);
  //     });
  // });

  it('Delete one user [DELETE /users/:id]', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
