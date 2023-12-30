import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { EmailModule } from '@app/common';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule, EmailModule],
  controllers: [HealthController],
})
export class HealthModule {}
