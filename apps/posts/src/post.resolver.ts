import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post';
import { mockPosts } from './__mocks__/mock.posts';
import { PostSettings } from './models/post.settings';
import { mockPostSettings } from './__mocks__/mock.post.settings';
import { CreatePostInput } from './dto/create.post.input';

export let incrementalId = 3;

@Resolver(() => Post)
export class PostsResolver {
  @Query(() => Post, { name: 'post', nullable: true })
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return mockPosts.find((post) => post.id === id);
  }

  @Query(() => [Post], { name: 'posts', nullable: true })
  getPosts() {
    return mockPosts;
  }

  @ResolveField('settings', () => PostSettings, { nullable: true })
  getPostSetting(@Parent() post: Post) {
    return mockPostSettings.find((setting) => setting.postId === post.id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostData')
    createPostData: CreatePostInput,
  ) {
    const newPost = {
      ...createPostData,
      id: ++incrementalId,
    };
    mockPosts.push(newPost);
    return newPost;
  }
}
