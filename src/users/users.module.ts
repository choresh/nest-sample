import { Module } from '@nestjs/common'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './entities/user.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: SchemaFactory.createForClass(User) }])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
