import * as DataLoader from 'dataloader'
import { DataloaderProvider } from '@tracworx/nestjs-dataloader'
import { type User } from './entities/user.entity'
import { type GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from './users.service'

@DataloaderProvider()
export class UsersLoader {
  constructor (private readonly service: UsersService) {
  }

  createDataloader (ctx: GqlExecutionContext): DataLoader<string, User> {
    // const user = ctx.getContext().req.user // Use this line if need to fetch request-scoped context data
    return new DataLoader<string, User>(async (ids) => await this.service.findByIds(ids))
  }
}
