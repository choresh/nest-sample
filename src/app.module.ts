import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
// import { UsersResolver } from './users/users.resolver'
// import { UsersService } from './users/users.service'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'peech',
      entities: [join(__dirname, '/**/entities/*.entity.js')], // Fetch all entities metadata (clases) from relevant files under 'dist' folder.
      dropSchema: true, // (TODO: Not for pruduction!!!)
      synchronize: true // (TODO: Not for pruduction!!!)
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
