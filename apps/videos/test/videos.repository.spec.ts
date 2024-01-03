import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery, Connection } from 'mongoose';
import { videoStub } from './stubs/video.stub';
import { VideoModel } from './support/video.model';
import { VideosRepository } from '../src/videos.repository';
import { Video } from '../src/schemas/video.schema';

describe('VideosRepository', () => {
  let videosRepository: VideosRepository;

  describe('find operations', () => {
    let videoModel: VideoModel;
    let videoFilterQuery: FilterQuery<Video>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          VideosRepository,
          {
            provide: getModelToken(Video.name),
            useClass: VideoModel,
          },
          {
            provide: 'DatabaseConnection',
            useClass: Connection,
          },
        ],
      }).compile();

      videosRepository = moduleRef.get<VideosRepository>(VideosRepository);
      videoModel = moduleRef.get<VideoModel>(getModelToken(Video.name));

      videoFilterQuery = {
        videoId: videoStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let video: Video;

        beforeEach(async () => {
          jest.spyOn(videoModel, 'findOne');
          video = await videosRepository.findOne(videoFilterQuery);
        });

        test('then it should call the videoModel', () => {
          expect(videoModel.findOne).toHaveBeenCalledWith(
            videoFilterQuery,
            {},
            {
              lean: true,
            },
          );
        });

        test('then it should return a video', () => {
          expect(video).toEqual(videoStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let videos: Video[];

        beforeEach(async () => {
          jest.spyOn(videoModel, 'find');
          videos = await videosRepository.find(videoFilterQuery);
        });

        test('then it should call the videoModel', () => {
          expect(videoModel.find).toHaveBeenCalledWith(
            videoFilterQuery,
            {},
            {
              lean: true,
            },
          );
        });

        test('then it should return a video', () => {
          expect(videos).toEqual([videoStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let video: Video;

        beforeEach(async () => {
          jest.spyOn(videoModel, 'findOneAndUpdate');
          video = await videosRepository.findOneAndUpdate(
            videoFilterQuery,
            videoStub(),
          );
        });

        test('then it should call the videoModel', () => {
          expect(videoModel.findOneAndUpdate).toHaveBeenCalledWith(
            videoFilterQuery,
            videoStub(),
            { new: true, lean: true },
          );
        });

        test('then it should return a video', () => {
          expect(video).toEqual(videoStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          VideosRepository,
          {
            provide: getModelToken(Video.name),
            useValue: VideoModel,
          },
          {
            provide: 'DatabaseConnection',
            useClass: Connection,
          },
        ],
      }).compile();

      videosRepository = moduleRef.get<VideosRepository>(VideosRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let video: Video;
        let saveSpy: jest.SpyInstance;
        // let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(VideoModel.prototype, 'save');
          // constructorSpy = jest.spyOn(VideoModel.prototype, 'constructorSpy');
          video = await videosRepository.create(videoStub());

          console.log('video', video);
        });

        test('then it should call the videoModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          // expect(constructorSpy).toHaveBeenCalledWith(videoStub());
        });

        test('then it should return a video', () => {
          expect(video).toEqual(videoStub());
        });
      });
    });
  });
});
