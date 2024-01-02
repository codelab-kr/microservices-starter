import { AuthGuard } from '@nestjs/passport';

export class NestAuthGuard extends AuthGuard('nest') {}
