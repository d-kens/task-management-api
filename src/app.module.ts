import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'taskmanagement',
      entities: [__dirname + './**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule
  ],
})
export class AppModule {}
