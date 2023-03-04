import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './entities/user.entity'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersLoader } from './users.loader'

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersResolver, UsersService, UsersLoader]
})
export class UsersModule {}
