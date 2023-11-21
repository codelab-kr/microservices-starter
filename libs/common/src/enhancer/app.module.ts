// import { Module } from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
// import { DataModule } from './database-/data.module';
// import { HealthModule } from '../health/health.module';
// import { PointModule } from '../../../../apps/point/point.module';
// import { AllExceptionFilter } from './filters/all-exception.filter';
// import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
// import { AuthModule } from '../../../../apps/auth-star/auth.module';
// import { PostModule } from '../../../../apps/post/post.module';
// import { RelationModule } from '../../../../apps/relation/relation.module';
// import { ConfigModule } from '@nestjs/config';
// import { emailConfig, testEmailConfig } from '../config/functional/emailConfig';
// import { authConfig } from '../config/functional/authConfig';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
// import { ExceptionModule } from './filters/exception.module';
// import { TypeOrmExModule } from './database-typeorm-ex/typeorm-ex.module';
// import { BatchModule } from '../batch/batch.module';
// import { UsersModule } from '../../../../apps/users/src/users.module';
// // import { FileModule } from './file/file.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       load: [emailConfig, testEmailConfig, authConfig],
//       isGlobal: true,
//     }),
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'public'),
//     }),
//     DataModule,
//     HealthModule,
//     AuthModule,
//     PostModule,
//     RelationModule,
//     PointModule,
//     TypeOrmExModule,
//     ExceptionModule,
//     BatchModule,
//     UsersModule,
//     // FileModule,
//   ],
//   providers: [
//     {
//       provide: APP_FILTER,
//       useClass: AllExceptionFilter,
//     },
//     {
//       provide: APP_FILTER,
//       useClass: NotFoundExceptionFilter,
//     },
//   ],
// })
// export class AppModule {}
