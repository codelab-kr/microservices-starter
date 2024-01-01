import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PaymentsModule } from '../src/payments/payments.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import {
  createPaymentMutation,
  getPaymentsQuery,
} from '../src/payments/utils/queries';

describe('Graphql Server Payments (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentsModule],
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

  describe('getPayments', () => {
    it('should query getPayments and return 0 payments', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPaymentsQuery) })
        .expect((res) => {
          expect(res.body.data.getPayments).toHaveLength(0);
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
    it('should query getPayments and return 1 payments', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPaymentsQuery) })
        .expect((res) => {
          expect(res.body.data.getPayments).toHaveLength(1);
        });
    });
  });
});
