import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User_ } from './entities/user.entity';
// import { Task_ } from './entities/task.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
import {UsersResolver} from './users/users.resolver';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'peech',
      // entities: [User, Task],
      entities: [__dirname + './entities/*.entity.ts'],
      synchronize: true,
    }),
    // TypeOrmModule.forFeature([User, Task]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: ['dist/*/*/*.js']
      autoSchemaFile: true,
      // typeDefs: [__dirname + './entities/*.entity.ts']
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers:  [AppService],
})

export class AppModule {}

