import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { CreatePostInput } from '../utils/create.post.input';
import { PostsService } from '../posts.service';
import { PostSettingsService } from '../post.settings.service';
import { Post } from '../models/post';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    @Inject(PostsService)
    private readonly postsService: PostsService,
    private readonly postSettingsService: PostSettingsService,
  ) {}

  @Query(() => Post, { nullable: true })
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findById(id);
  }

  @Query(() => [Post], { nullable: true })
  getPosts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostData')
    createPostData: CreatePostInput,
  ) {
    return this.postsService.createPost(createPostData);
  }

  // @ResolveField('settings', () => PostSettings, { nullable: true })
  // getPostSetting(@Parent() post: Post) {
  //   return this.postSettingsService.findByPostId(post.id);
  // }
}
