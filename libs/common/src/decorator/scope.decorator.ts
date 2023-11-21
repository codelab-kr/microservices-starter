import { SetMetadata } from '@nestjs/common';
import { Scope } from '../../../../apps/post/post.entity';

export const Scopes = (...scopes: Scope[]) => SetMetadata('scopes', scopes);
