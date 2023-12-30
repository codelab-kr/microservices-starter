import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { Post } from './models/post';

@CustomRepository(Post)
export class PostsRepository extends Repository<Post> {}
