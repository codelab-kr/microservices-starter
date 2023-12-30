import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostSettingsInput } from './dto/create.post.settings';
import { mockPostSettings } from './__mocks__/mock.post.settings';
import { PostSettings } from './models/post.settings';

@Resolver()
export class PostSettingResolver {
  @Mutation(() => PostSettings)
  createPostSetting(
    @Args('createPostSettingData')
    createPostSettingData: CreatePostSettingsInput,
  ) {
    mockPostSettings.push(createPostSettingData);
    return createPostSettingData;
  }
}
