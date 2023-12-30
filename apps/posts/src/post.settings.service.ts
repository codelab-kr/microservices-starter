import { Injectable } from '@nestjs/common';
import { PostSettingsRepository } from './repositories/post.settings.repository';
import { PostSettings } from './models/post.settings';
import { CreatePostSettingsInput } from './utils/create.post.settings.input';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostSettingsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postSettingsRepository: PostSettingsRepository,
  ) {}

  /**
   * POST Settings를 생성한다.
   *
   * @param {CreatePostSettingsInput} requestDto - POST Settings를 생성 Dto
   * @returns {Promise<PostSettings>}
   */
  async createPostSettings(
    requestDto: CreatePostSettingsInput,
  ): Promise<PostSettings> {
    const findPost = await this.postsRepository.findOneBy({
      id: requestDto.postId,
    });
    if (!findPost) throw new Error('Post not found');
    const newSettings = this.postSettingsRepository.create(requestDto);
    const savedSettings = await this.postSettingsRepository.save(newSettings);
    findPost.settings = savedSettings;
    await this.postsRepository.save(findPost);
    return savedSettings;
  }

  /**
   * POST Id에 해당하는 POST Settings 정보를 반환한다.
   *
   * @param {number} postId - POST Id
   * @returns {Promise<PostSettings>}
   */
  findByPostId(postId: number): Promise<PostSettings> {
    return this.postSettingsRepository.findOneBy({ postId });
  }
}
