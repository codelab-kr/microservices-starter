import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostSettingsInput } from '../utils/create.post.settings.input';
import { PostSettings } from '../models/post.settings';

import { Inject } from '@nestjs/common';
import { PostSettingsService } from '../post.settings.service';

@Resolver()
export class PostSettingResolver {
  constructor(
    @Inject(PostSettingsService)
    private readonly postSettingsService: PostSettingsService,
  ) {}

  @Mutation(() => PostSettings)
  async createPostSettings(
    @Args('createPostSettingData')
    createPostSettingData: CreatePostSettingsInput,
  ) {
    return await this.postSettingsService.createPostSettings(
      createPostSettingData,
    );
  }
}
