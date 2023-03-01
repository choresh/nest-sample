import * as DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { type NestDataLoader } from 'nestjs-dataloader'
import { type User } from './entities/user.entity'
import { UsersService } from './users.service'

@Injectable()
export class UsersLoader implements NestDataLoader<string, User> {
  constructor (private readonly service: UsersService) {
  }

  generateDataLoader (): DataLoader<string, User> {
    return new DataLoader<string, User>(async (keys) => await this.service.findByIds(keys))
  }
}
