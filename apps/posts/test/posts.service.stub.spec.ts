import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PostsService } from '../src/posts.service';
import { PostsRepository } from '../src/posts.repository';
import { PostCreateRequestDto } from '../src/dto/post-create-request.dto';
import { PostUpdateRequestDto } from '../src/dto/post-update-request.dto';
import { Post } from '../src/models/post';
import { postStub } from './stubs/post.stub';

describe('PostsService (Stub)', () => {
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepository],
    }).compile();
    postsService = module.get<PostsService>(PostsService);
  });

  describe('createPost', () => {
    describe('when createPost is called', () => {
      let post: Post;
      let saveSpy: jest.SpyInstance;

      const request = new PostCreateRequestDto();
      request.title = postStub().title;
      request.content = postStub().content;
      request.userId = postStub().userId;

      beforeEach(async () => {
        saveSpy = jest
          .spyOn(PostsRepository.prototype, 'save')
          .mockResolvedValue(postStub());
        post = await postsService.createPost(request);
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
    describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
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
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        }
      });

      describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', () => {
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
          expect(findSpy).toHaveBeenCalledWith({ where: { id } });
        });

        test('then it should return a post', async () => {
          expect(post).toEqual(postStub());
        });
      });

      describe('updatePost', () => {
        describe('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', () => {
          let findSpy: jest.SpyInstance;
          const requestDto: PostUpdateRequestDto = {
            id: 1,
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
              });
            }
          });
        });

        describe('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', () => {
          let post: Post;
          let findSpy: jest.SpyInstance;
          let saveSpy: jest.SpyInstance;
          const request: PostUpdateRequestDto = {
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
            expect(findSpy).toHaveBeenCalledWith({ where: { id } });
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
        describe('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', () => {
          const id = 1;
          let deleteSpy: jest.SpyInstance;
          let result: void;

          beforeEach(async () => {
            deleteSpy = jest
              .spyOn(PostsRepository.prototype, 'delete')
              .mockResolvedValue({} as DeleteResult);
            result = await postsService.deletePost(id);
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
  });
});
