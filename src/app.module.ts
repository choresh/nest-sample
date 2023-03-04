import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { TenantsModule } from './tenants/tenants.module'
import { TypegooseModule } from 'nestjs-typegoose'
import mongoose from 'mongoose'
import { DataloaderModule } from '@tracworx/nestjs-dataloader'

mongoose.set('debug', (collection: string, method: string, query: any, doc: any) => {
  // console.log(`${collectionName}.${method}`, JSON.stringify(query), doc)
  console.log(`\r\n>>>>>>>>>>>>>>>>>>>>>>>>>>>\r\nMongoose log message:\r\n ${JSON.stringify({ collection, method, query, doc }, undefined, 4)}\r\n<<<<<<<<<<<<<<<<<<<<<<<<<<<\r\n`)
})

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb://localhost'
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    DataloaderModule,
    UsersModule,
    TasksModule,
    TenantsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
