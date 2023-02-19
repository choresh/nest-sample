import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { TenantsModule } from './tenants/tenants.module'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb://localhost'
    ),
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
