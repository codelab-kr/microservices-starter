import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentsModule } from '../src/payments/payments.module';
import { PaymentsRepository } from '../src/payments/repositories/payments.repository';
import { DataSource } from 'typeorm';

describe('PaymentsController (e2e)', () => {
  let app: INestApplication;
  let paymentsRepository: PaymentsRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    paymentsRepository =
      moduleFixture.get<PaymentsRepository>(PaymentsRepository);
    const dataSource = app.get(DataSource);
    await dataSource.synchronize();
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

  beforeEach(async () => {
    await paymentsRepository.clear();
  });

  describe('GET /payments', () => {
    it('200(OK)과 생성된 모든 유저 목록을 json 타입으로 응답한다', async () => {
      await paymentsRepository.save([
        { id: 1, title: 'Tei', content: 'Lee', userId: 2 },
        { id: 2, title: '태의', content: '이', userId: 2 },
      ]);

      const res = await request(app.getHttpServer()).get('/payments');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body).toStrictEqual([
        {
          id: 1,
          title: 'Tei',
          content: 'Lee',
          userId: 2,
          settings: null,
        },
        {
          id: 2,
          title: '태의',
          content: '이',
          userId: 2,
          settings: null,
        },
      ]);
    });
  });

  describe('PAYMENT /payments', () => {
    it('유저를 생성하고, 201(Created)과 유저를 응답한다', async () => {
      const title = 'Tei';
      const content = 'Lee';
      const userId = 1;

      const res = await request(app.getHttpServer()).post('/payments').send({
        id: 1,
        title: title,
        content: content,
        userId: userId,
      });

      expect(res.status).toBe(201);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body.title).toBe(title);
      expect(body.content).toBe(content);
      expect(body.userId).toBe(userId);
    });
  });
});
