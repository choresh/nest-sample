import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './entities/user.entity'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersLoader } from './users.loader'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DataLoaderInterceptor } from 'nestjs-graphql-dataloader'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    UsersLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    }
  ]
})
export class UsersModule {}
