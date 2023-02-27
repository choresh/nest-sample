import { Resolver } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'
import { ResolverBase } from '../infra/bases/resolverBase'

@Resolver(() => User)
export class UsersResolver extends ResolverBase<User, CreateUserInput, UpdateUserInput> {
}
