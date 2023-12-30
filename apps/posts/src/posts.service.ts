import { NotFoundException, Injectable } from '@nestjs/common';
import { Post } from './models/post';
import { isEmpty } from '@app/common';
import { PostsMessage } from './posts.message';
import { CreatePostInput } from './inputs/create.post.input';
import { UpdatePostInput } from './inputs/update.post.ipnput';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  /**
   * POST를 생성한다.
   *
   * @param {PostCreateRequestDto} requestDto - POST 생성 Dto
   * @returns {Promise<Post>}
   */
  createPost(requestDto: CreatePostInput): Promise<Post> {
    return this.postsRepository.save(requestDto);
  }

  /**
   * 모든 POST 정보를 조회한다.
   *
   * @returns {Promise<Post[]>}
   */
  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['settings'] });
  }

  /**
   * POST Id에 해당하는 POST 정보를 조회한다.
   *
   * @param {number} id - POST Id
   * @returns {Promise<PostResponseDto>}
   */
  findById(id: number): Promise<Post> {
    return this.findPostById(id);
  }

  /**
   * POST Id에 해당하는 POST 정보를 수정한다.
   *
   * @param {number} id - POST Id
   * @param {PostUpdateRequestDto} requestDto - POST 수정 Dto
   * @returns {Promise<Post>}
   */
  async updatePost(requestDto: UpdatePostInput): Promise<Post> {
    const post = await this.findPostById(requestDto.id);
    const { userId } = requestDto;
    const updatePost = { ...post, userId };
    return this.postsRepository.save(updatePost);
  }

  /**
   * POST Id에 해당하는 POST 정보를 반환한다.
   *
   * @param {number} id - POST Id
   * @returns {Promise<Post>}
   * @private
   */
  private async findPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['settings'],
    });

    if (isEmpty(post) === true) {
      throw new NotFoundException(PostsMessage.NOT_FOUND_POST);
    }

    return post;
  }

  /**
   * POST Id에 해당하는 POST 정보를 삭제한다.
   *
   * @param {number} id - POST Id
   * @returns {Promise<void>}
   */
  deletePost(id: number): void {
    this.postsRepository.delete(id);
  }
}
