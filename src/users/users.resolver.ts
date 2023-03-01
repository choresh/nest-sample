import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UsersLoader } from './users.loader'
import DataLoader from 'dataloader'
import { Loader } from 'nestjs-dataloader'
import { ObjectId } from 'mongoose'

@Resolver(() => User)
export class UsersResolver {
  constructor (private readonly usersService: UsersService) {
  }

  @Mutation(() => User)
  async createUser (@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Query(() => [User])
  async getUsers (
    @Args({ name: 'ids', type: () => [String] }) ids: ObjectId[],
      @Loader(UsersLoader) loader: DataLoader<User['_id'], User>
  ): Promise<Array<User | Error>> {
    return await loader.loadMany(ids)
  }

  @Query(() => User, { name: 'user' })
  async findOne (
    @Args('id', { type: () => String }) id: ObjectId,
      @Loader(UsersLoader) loader: DataLoader<User['_id'], User>
  ): Promise<User> {
    return await loader.load(id)
  }

  @Mutation(() => User)
  async updateUser (@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  async removeUser (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.usersService.remove(id)
  }
}
/*
function Loader(UsersLoader: typeof UsersLoader) {
  throw new Error('Function not implemented.')
}
*/
