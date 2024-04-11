import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
    TasksModule,
    AuthModule,
    UsersModule
  ],
  providers: [],
})
export class AppModule {}
