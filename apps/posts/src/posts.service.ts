import { NotFoundException, Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './models/post';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostUpdateRequestDto } from './dto/post-update-request.dto';
import { isEmpty } from '@app/common';
import { PostsMessage } from './posts.message';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  /**
   * 회원를 생성한다.
   *
   * @param {PostCreateRequestDto} requestDto - 회원 생성 Dto
   * @returns {Promise<Post>}
   */
  async createPost(requestDto: PostCreateRequestDto): Promise<Post> {
    return this.postsRepository.save(requestDto);
  }

  /**
   * 모든 회원 정보를 조회한다.
   *
   * @returns {Promise<Post[]>}
   */
  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 조회한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<PostResponseDto>}
   */
  async findById(id: number): Promise<Post> {
    const post = await this.findPostById(id);
    return post;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 수정한다.
   *
   * @param {number} id - 회원 Id
   * @param {PostUpdateRequestDto} requestDto - 회원 수정 Dto
   * @returns {Promise<Post>}
   */
  async updatePost(requestDto: PostUpdateRequestDto): Promise<Post> {
    const post = await this.findPostById(requestDto.id);
    const { userId } = requestDto;
    const updatePost = { ...post, userId };
    return this.postsRepository.save(updatePost);
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 반환한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<Post>}
   * @private
   */
  private async findPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    if (isEmpty(post) === true) {
      throw new NotFoundException(PostsMessage.NOT_FOUND_POST);
    }

    return post;
  }

  /**
   * 회원 Id에 해당하는 회원 정보를 삭제한다.
   *
   * @param {number} id - 회원 Id
   * @returns {Promise<void>}
   */
  async deletePost(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
