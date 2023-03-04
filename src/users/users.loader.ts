import { Injectable, Scope } from '@nestjs/common'
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader'
import { type User } from './entities/user.entity'
import { UsersService } from './users.service'

@Injectable({ scope: Scope.REQUEST })
export class UsersLoader extends OrderedNestDataLoader<User['_id'], User> {
  constructor (private readonly service: UsersService) {
    super()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getOptions = () => ({
    query: async (keys: string[]) => await this.service.findByIds(keys)
  })
}
