import * as DataLoader from 'dataloader'
import { DataloaderProvider } from '@tracworx/nestjs-dataloader'
import { type Task } from './entities/task.entity'
import { type GqlExecutionContext } from '@nestjs/graphql'
import { TasksService } from './tasks.service'

@DataloaderProvider()
export class TasksLoader {
  constructor (private readonly service: TasksService) {
  }

  createDataloader (ctx: GqlExecutionContext): DataLoader<string, Task> {
    // const task = ctx.getContext().req.task // Use this line if need to fetch request-scoped context data
    return new DataLoader<string, Task>(async (ids) => await this.service.findByIds(ids))
  }
}
