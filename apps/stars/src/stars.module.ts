import { Module } from '@nestjs/common';
import { StarsRepository } from './stars.repository';
import { StarsController } from './stars.controller';
import { StarsService } from './stars.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/stars/.env',
    }),
    DataModule,
    TypeOrmExModule.forCustomRepository([StarsRepository]),
  ],
  controllers: [StarsController],
  providers: [StarsService],
})
export class StarsModule {}
