// import { Test, TestingModule } from '@nestjs/testing';
// import { VideosController } from '../src/videos.controller';
// import { VideosService } from '../src/videos.service';

// describe('VideosController', () => {
//   let videosController: VideosController;
//   let videosService: VideosService;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [VideosController],
//       providers: [VideosService],
//     }).compile();

//     videosController = app.get<VideosController>(VideosController);
//     videosService = app.get<VideosService>(VideosService);
//   });

//   describe('createVideo', () => {
//     it('should call videosService.create with the correct arguments', async () => {
//       const request = {
//         title: 'Test Video',
//         path: 'https://example.com/test.mp4',
//       };
//       const createSpy = jest.spyOn(videosService, 'create');

//       await videosController.createVideo(request);

//       expect(createSpy).toHaveBeenCalledWith(request);
//     });

//     it('should return the result of videosService.create', async () => {
//       const request = {
//         _id: '6540fb6bf0e5f499eae55443' as any,
//         title: 'Test Video',
//         path: 'https://example.com/test.mp4',
//       };
//       const expectedResult = { id: 1, ...request };
//       jest.spyOn(videosService, 'create').mockResolvedValue(expectedResult);

//       const result = await videosController.createVideo(request);

//       expect(result).toEqual(expectedResult);
//     });
//   });

//   describe('getVideos', () => {
//     it('should return the result of videosService.getVideos', async () => {
//       const expectedResult = [
//         {
//           _id: '6540fb6bf0e5f499eae55443' as any,
//           title: 'Test Video',
//           path: 'https://example.com/test.mp4',
//         },
//       ];
//       jest.spyOn(videosService, 'getVideos').mockResolvedValue(expectedResult);

//       const result = await videosController.getVideos();

//       expect(result).toEqual(expectedResult);
//     });
//   });
// });
