import { Module } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../auth-star/src/user.service';
import { UserRepository } from '../auth-star/src/repository/user.repository';
import { AuthService } from '../auth-star/src/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RelationService } from '../relation/relation.service';
import { RelationRepository } from '../relation/repository/relation.repository';
import { RelationDetailRepository } from '../relation/repository/relation-detail.repository';
import { PointService } from '../point/point.service';
import { PointRepository } from '../point/point.repository';
import { PointUserepository } from '../point/point-use.repository';
import { ConfigService } from '@nestjs/config';
import { TypeOrmExModule } from '../../libs/common/src/database-typeorm-ex/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PostRepository,
      UserRepository,
      RelationRepository,
      RelationDetailRepository,
      PointRepository,
      PointUserepository,
    ]),
    PassportModule,
  ],
  controllers: [PostController],
  providers: [
    UserService,
    PostService,
    AuthService,
    JwtService,
    RelationService,
    PointService,
    ConfigService,
  ],
})
export class PostModule {}
