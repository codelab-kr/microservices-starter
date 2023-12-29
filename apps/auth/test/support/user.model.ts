import { MockModel } from '@app/common/database/test/support/mock.model';
import { userStub } from '../stubs/user.stub';
import { User } from '../../src/users/schemas/user.schema';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
