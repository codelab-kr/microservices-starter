import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import { PostsService } from '../src/posts.service';
import { PostsRepository } from '../src/repositories/posts.repository';
import { Post } from '../src/models/post';
import { postStub } from './stubs/post.stub';
import { CreatePostInput } from '../src/utils/create.post.input';
import { UpdatePostInput } from '../src/utils/update.post.ipnput';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PostSettings } from '../src/models/post.settings';
import { PostsModule } from '../src/posts.module';
// import { DataModule } from '../../../libs/common/src';

// TODO: 종료 후에도 자원이 해제되지 않음

describe('PostsService (Stub)', () => {
  let app: INestApplication;
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      // imports: [
      //   TypeOrmModule.forRoot({
      //     type: 'sqlite',
      //     database: ':memory:',
      //     entities: [Post, PostSettings],
      //     autoLoadEntities: true,
      //     synchronize: true,
      //   }),
      //   PostsModule,
      // ],
      imports: [PostsModule],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
    app = moduleRef.createNestApplication();
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
    console.log('afterAll');
  });

  describe('createPost', () => {
    describe('when createPost is called', () => {
      let post: Post;
      let saveSpy: jest.SpyInstance;

      const request = new CreatePostInput();
      request.title = postStub().title;
      request.content = postStub().content;
      request.userId = postStub().userId;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(PostsRepository.prototype, 'save')
          .mockResolvedValue(postStub());
        post = await postsService.createPost(request);
        console.log('post', post);
      });

      test('then it should call postRepository', async () => {
        expect(saveSpy).toHaveBeenCalledWith(request);
      });

      test('then it should return a post', () => {
        expect(post).toEqual(postStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let posts: Post[];
      let findSpy: jest.SpyInstance;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PostsRepository.prototype, 'find')
          .mockResolvedValue([postStub()]);
        posts = await postsService.findAll();
      });

      test('then it should call postRepository', async () => {
        expect(findSpy).toHaveBeenCalled();
      });

      test('then it should return posts', () => {
        expect(posts).toStrictEqual([postStub()]);
      });
    });
  });

  describe('findById', () => {
    describe('생성되지 않은 POST의 id가 주어진다면 POST를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PostsRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(postsService.findById(id)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call postRepository', async () => {
        try {
          await postsService.findById(id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({
            where: { id },
            relations: ['settings'],
          });
        }
      });
    });

    describe('생성된 POST의 id가 주어진다면 해당 id의 POST를 반환한다', () => {
      let post: Post;
      let findSpy: jest.SpyInstance;
      const id = 1;

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PostsRepository.prototype, 'findOne')
          .mockResolvedValue(postStub());
        post = await postsService.findById(id);
      });

      test('then it should call postRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id },
          relations: ['settings'],
        });
      });

      test('then it should return a post', async () => {
        expect(post).toEqual(postStub());
      });
    });
  });

  describe('updatePost', () => {
    describe('생성되지 않은 POST의 id가 주어진다면 POST를 찾을 수 없다는 예외를 던진다', () => {
      let findSpy: jest.SpyInstance;
      const requestDto: UpdatePostInput = {
        id: 11,
        userId: 1,
      };

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PostsRepository.prototype, 'findOne')
          .mockResolvedValue(undefined);
      });

      test('then it should return NotFoundException', async () => {
        await expect(postsService.updatePost(requestDto)).rejects.toThrow(
          NotFoundException,
        );
      });

      test('then it should call postRepository', async () => {
        try {
          await postsService.findById(requestDto.id);
        } catch (error) {
          expect(findSpy).toHaveBeenCalledWith({
            where: { id: requestDto.id },
            relations: ['settings'],
          });
        }
      });
    });

    describe('생성된 POST의 id가 주어진다면 해당 id의 POST를 수정하고 수정된 POST를 반환한다', () => {
      let post: Post;
      let findSpy: jest.SpyInstance;
      let saveSpy: jest.SpyInstance;
      const request: UpdatePostInput = {
        id: 1,
        userId: 1,
      };

      beforeEach(async () => {
        findSpy = jest
          .spyOn(PostsRepository.prototype, 'findOne')
          .mockResolvedValue(postStub());
        saveSpy = jest
          .spyOn(PostsRepository.prototype, 'save')
          .mockResolvedValue(postStub());
        post = await postsService.updatePost(request);
      });

      test('then it should call postRepository', async () => {
        expect(findSpy).toHaveBeenCalledWith({
          where: { id: request.id },
          relations: ['settings'],
        });
        expect(saveSpy).toHaveBeenCalledWith({
          ...postStub(),
          ...request,
        });
      });

      test('then it should return a post', async () => {
        expect(post).toEqual(postStub());
      });
    });
  });

  describe('deletePost', () => {
    describe('생성된 POST의 id가 주어진다면 생성된 POST를 삭제한다', () => {
      const id = 1;
      let deleteSpy: jest.SpyInstance;
      let result: void;

      beforeEach(async () => {
        deleteSpy = jest
          .spyOn(PostsRepository.prototype, 'delete')
          .mockResolvedValue({} as DeleteResult);
        result = postsService.deletePost(id);
      });

      test('then it should call postRepository', async () => {
        expect(deleteSpy).toHaveBeenCalledWith(id);
      });

      test('then it should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
