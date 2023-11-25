import { Repository } from 'typeorm';
import { PostEntity as Post } from '../post.entity';
import { CustomRepository } from '../../../libs/common/src/typeorm-ex/typeorm-ex.decorator';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {}
