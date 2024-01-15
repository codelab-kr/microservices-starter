import { Test, TestingModule } from '@nestjs/testing';
import { videoStub } from './stubs/video.stub';
import { VideosController } from '../src/videos.controller';
import { VideosService } from '../src/videos.service';
import { Video } from '../src/models/video';
import { CreateVideoInput } from '../src/dto/input/create-video.input';
// import { UpdateVideoInput } from '../src/dto/input/update-video.input';

jest.mock('../src/videos.service');

describe('VideosController', () => {
  let videosController: VideosController;
  let videosService: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService],
    }).compile();

    videosController = module.get<VideosController>(VideosController);
    videosService = module.get<VideosService>(VideosService);
    jest.clearAllMocks();
  });

  describe('getVideoById', () => {
    describe('when getVideoById is called', () => {
      let video: any;

      beforeEach(async () => {
        video = await videosController.getVideoById(videoStub()._id.toString());
      });

      test('then it should call videosService', () => {
        expect(videosService.getVideoById).toHaveBeenCalledWith(
          videoStub()._id.toString(),
        );
      });

      test('then it should return a video', () => {
        expect(video).toEqual(videoStub());
      });
    });
  });

  describe('getVideos', () => {
    describe('when getVideos is called', () => {
      let videos: Video[];

      beforeEach(async () => {
        videos = await videosController.getVideos();
      });

      test('then it should call videosService', () => {
        expect(videosService.getVideos).toHaveBeenCalled();
      });

      test('then it should return videos', () => {
        expect(videos).toEqual([videoStub()]);
      });
    });
  });

  describe('createVideo', () => {
    describe('when createVideo is called', () => {
      let video: Video;
      let request: CreateVideoInput;

      beforeEach(async () => {
        request = {
          title: videoStub().title,
          type: videoStub().type,
          path: videoStub().path,
          description: videoStub().description,
          userId: videoStub().userId,
        };
        video = await videosController.createVideo(request);
      });

      test('then it should call videosService', async () => {
        expect(videosService.createVideo).toHaveBeenCalledWith({
          ...request,
        });
      });

      test('then it should return a video', () => {
        expect(video).toEqual(videoStub());
      });
    });
  });

  // describe('updateVideo', () => {
  //   describe('when updateVideo is called', () => {
  //     let video: Video;
  //     let request: UpdateVideoInput;

  //     beforeEach(async () => {
  //       request = {
  //         _id: videoStub()._id.toString(),
  //         password: 'password2',
  //         videoname: 'test2',
  //       };
  //       video = await videosController.updateVideo(
  //         videoStub()._id.toString(),
  //         request,
  //       );
  //       console.log(video);
  //     });

  //     test('then it should call videosService', () => {
  //       expect(videosService.updateVideo).toHaveBeenCalledWith(request);
  //     });

  //     test('then it should return a video', () => {
  //       expect(video).toEqual(videoStub());
  //     });
  //   });
  // });

  // describe('deleteVideo', () => {
  //   describe('when deleteVideo is called', () => {
  //     let video: Video;

  //     beforeEach(async () => {
  //       video = await videosController.deleteVideo(videoStub()._id.toString());
  //     });

  //     test('then it should call videosService', () => {
  //       expect(videosService.deleteVideo).toHaveBeenCalledWith({
  //         _id: videoStub()._id.toString(),
  //       });
  //     });

  //     test('then it should return a video', () => {
  //       expect(video).toEqual(videoStub());
  //     });
  //   });
  // });
});
