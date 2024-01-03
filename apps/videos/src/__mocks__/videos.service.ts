import { videoStub } from '../../test/stubs/video.stub';

export const VideosService = jest.fn().mockReturnValue({
  createVideo: jest.fn().mockResolvedValue(videoStub()),
  updateVideo: jest.fn().mockResolvedValue(videoStub()),
  deleteVideo: jest.fn().mockResolvedValue(videoStub()),
  getVideo: jest.fn().mockResolvedValue(videoStub()),
  getVideos: jest.fn().mockResolvedValue([videoStub()]),
});
