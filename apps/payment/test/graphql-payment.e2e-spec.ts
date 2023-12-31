import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentModule } from '../src/payment.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import { createPaymentMutation, getPaymentQuery } from '../src/utils/queries';

describe('Graphql Server Payment (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  describe('getPayment', () => {
    it('should query getPayment and return 0 payment', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPaymentQuery) })
        .expect((res) => {
          expect(res.body.data.getPayment).toHaveLength(0);
        });
    });
    it('should create a payment using createPayment mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(createPaymentMutation) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createPayment).toEqual({
            id: 1,
            title: 'title',
            content: 'content',
            userId: 1,
            settings: null,
          });
        });
    });
    it('should query getPayment and return 1 payment', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPaymentQuery) })
        .expect((res) => {
          expect(res.body.data.getPayment).toHaveLength(1);
        });
    });
  });
});
