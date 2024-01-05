import { MockModel } from '@app/common/database/mongo/test/support/mock.model';
import { videoStub } from '../stubs/video.stub';
import { Video } from '../../src/models/video';

export class VideoModel extends MockModel<Video> {
  protected entityStub = videoStub();
}
