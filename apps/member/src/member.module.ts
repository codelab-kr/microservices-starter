import { Module } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmExModule } from '../../../libs/common/src/database-typeorm-ex/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([MemberRepository])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
