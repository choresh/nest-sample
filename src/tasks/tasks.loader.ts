import { Injectable, Scope } from '@nestjs/common'
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader'
import { type Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

@Injectable({ scope: Scope.REQUEST })
export class TasksLoader extends OrderedNestDataLoader<Task['_id'], Task> {
  constructor (private readonly service: TasksService) {
    super()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getOptions = () => ({
    query: async (keys: string[]) => await this.service.findByIds(keys)
  })
}
