import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../src/posts.controller';
import { PostsService } from '../src/posts.service';
import { postStub } from './stubs/post.stub';
import { PostCreateRequestDto } from '../src/dto/post-create-request.dto';
import { Post } from '../src/models/post';

jest.mock('../src/posts.service');

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    postsController = app.get<PostsController>(PostsController);
    postsService = app.get<PostsService>(PostsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let post: Post;

      beforeEach(async () => {
        post = await postsController.findOne(postStub().id);
      });

      test('then it should call postsService', () => {
        expect(postsService.findById).toHaveBeenCalledWith(postStub().id);
      });

      test('then it should return a post', () => {
        expect(post).toEqual(postStub());
      });
    });

    describe('findAll', () => {
      describe('when getPosts is called ', () => {
        let posts: Post[];

        beforeEach(async () => {
          posts = await postsController.findAll();
        });

        test('then it should call postsService', () => {
          expect(postsService.findAll).toHaveBeenCalled();
        });

        test('then it should return posts', () => {
          expect(posts).toEqual([postStub()]);
        });
      });
    });

    describe('create', () => {
      describe('when create is called', () => {
        let post: Post;
        let request: PostCreateRequestDto;

        beforeEach(async () => {
          request = {
            title: postStub().title,
            content: postStub().content,
            userId: postStub().userId,
          };
          post = await postsController.create(request);
        });

        test('then it should call postsService', async () => {
          expect(postsService.createPost).toHaveBeenCalledWith(request);
        });

        test('then it should return a post', () => {
          expect(post).toEqual(postStub());
        });
      });
    });
  });
});
