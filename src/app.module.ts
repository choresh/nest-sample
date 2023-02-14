import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { TenantsModule } from './tenants/tenants.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      useUnifiedTopology: true,
      // username: 'root',
      // password: '',
      // database: 'peech',
      // dropSchema: true, // (TODO: Not for pruduction!!!)
      // synchronize: true, // (TODO: Not for pruduction!!!)
      entities: [join(__dirname, '/**/entities/*.entity.js')] // Fetch all entities metadata (classes) from relevant files under 'dist' folder.
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    UsersModule,
    TasksModule,
    TenantsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
