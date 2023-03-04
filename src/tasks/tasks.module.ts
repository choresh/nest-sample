import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TasksService } from './tasks.service'
import { TasksResolver } from './tasks.resolver'
import { Task } from './entities/task.entity'
import { TasksLoader } from './tasks.loader'

@Module({
  imports: [TypegooseModule.forFeature([Task])],
  providers: [TasksResolver, TasksService, TasksLoader]
})
export class TasksModule {}
