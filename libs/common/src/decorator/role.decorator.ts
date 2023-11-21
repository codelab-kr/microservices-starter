import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../../apps/auth-star/src/user.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
