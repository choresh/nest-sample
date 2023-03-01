import * as DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { type NestDataLoader } from 'nestjs-dataloader'
import { type Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

@Injectable()
export class TasksLoader implements NestDataLoader<string, Task> {
  constructor (private readonly service: TasksService) {
  }

  generateDataLoader (): DataLoader<string, Task> {
    return new DataLoader<string, Task>(async (keys) => await this.service.findByIds(keys))
  }
}
