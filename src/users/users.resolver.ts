import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersInfo, UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

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
  async findOne (@Args('id', { type: () => String }) id: string): Promise<User | null> {
    return await this.usersService.findOne(id)
  }

  @Mutation(() => User)
  async updateUser (@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return await this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  async removeUser (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.usersService.remove(id)
  }

  @Query(() => User, { name: 'userByIndex' })
  async findOneByIndex (@Args('tenanId', { type: () => String }) tenantId: string, @Args('name', { type: () => String }) name: string): Promise<User | null> {
    return await this.usersService.findOneByIndex(tenantId, name)
  }

  // @Query(() => User)
  // async demonstrateComplexQuery (): Promise<User | null> {
  //   return await this.usersService.demonstrateComplexQuery()
  // }

  @Query(() => UsersInfo)
  async demonstrateComplexQuery (): Promise<UsersInfo> {
    return await this.usersService.demonstrateComplexQuery()
  }

  @Query(() => [User])
  async demonstrateTransactionBlock (): Promise<User[]> {
    return await this.usersService.demonstrateTransactionBlock()
  }

  @Query(() => [User])
  async demonstrateTransactionFlow (): Promise<User[]> {
    return await this.usersService.demonstrateTransactionFlow()
  }

  @Query(() => [User])
  async demonstrateTransactionLock (): Promise<User[]> {
    return await this.usersService.demonstrateTransactionLock()
  }
}
