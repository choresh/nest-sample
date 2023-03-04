import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UsersLoader } from './users.loader'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Loader } from '@tracworx/nestjs-dataloader'
import * as DataLoader from 'dataloader'

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

  @Query(() => User, { name: 'user' })
  async findOne (@Args('id', { type: () => String }) id: string,
    @Loader(UsersLoader) loader): Promise<User | null> {
    return loader.load(id)
  }

  @Query(() => [User])
  async getUsers (
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
      @Loader(UsersLoader) loader: DataLoader<string, User>): Promise<Array<User | Error>> {
    return await loader.loadMany(ids)
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
