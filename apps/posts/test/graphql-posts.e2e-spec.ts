import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PostsModule } from '../src/posts.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import { createPostMutation, getPostsQuery } from '../src/utils/queries';

describe('Graphql Server Posts (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
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

  describe('getPosts', () => {
    it('should query getPosts and return 0 posts', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPostsQuery) })
        .expect((res) => {
          expect(res.body.data.getPosts).toHaveLength(0);
        });
    });
    it('should create a post using createPost mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(createPostMutation) })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createPost).toEqual({
            id: 1,
            title: 'title',
            content: 'content',
            userId: 1,
            settings: null,
          });
        });
    });
    it('should query getPosts and return 1 posts', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getPostsQuery) })
        .expect((res) => {
          expect(res.body.data.getPosts).toHaveLength(1);
        });
    });
  });
});
