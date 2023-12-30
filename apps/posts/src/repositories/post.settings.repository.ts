import { Repository } from 'typeorm';
import { CustomRepository } from '@app/common';
import { PostSettings } from '../models/post.settings';

@CustomRepository(PostSettings)
export class PostSettingsRepository extends Repository<PostSettings> {}
