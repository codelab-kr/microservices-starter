import { MockModel } from '@app/common/database/mongodb/test/support/mock.model';
import { videoStub } from '../stubs/video.stub';
import { Video } from '../../src/schemas/video.schema';

export class VideoModel extends MockModel<Video> {
  protected entityStub = videoStub();
}
