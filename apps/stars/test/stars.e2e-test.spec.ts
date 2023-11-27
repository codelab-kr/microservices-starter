import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarsModule } from '../src/stars.module';
import { StarCreateRequestDto } from '../src/dto/star-create-request.dto';
import { Star } from '../src/star.entity';

describe('Stars - /stars (e2e)', () => {
  const star = {
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
          entities: [Star],
          autoLoadEntities: true,
          synchronize: true,
        }),
        StarsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /stars]', () => {
    return request(app.getHttpServer())
      .post('/stars')
      .send(star as unknown as StarCreateRequestDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(star);
      });
  });

  it('Get all stars [GET /stars]', () => {
    return request(app.getHttpServer())
      .get('/stars')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one star [GET /stars/:id]', () => {
    return request(app.getHttpServer())
      .get('/stars/1')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  // it('Update one star [PUT /stars/:id]', () => {
  //   return request(app.getHttpServer())
  //     .put('/stars/1')
  //     .send(star as unknown as StarCreateRequestDto)
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toEqual(star);
  //     });
  // });

  it('Delete one star [DELETE /stars/:id]', () => {
    return request(app.getHttpServer()).delete('/stars/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
