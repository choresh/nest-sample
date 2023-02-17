import { Module } from '@nestjs/common'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { TasksService } from './tasks.service'
import { TasksResolver } from './tasks.resolver'
import { Task } from './entities/task.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: SchemaFactory.createForClass(Task) }])],
  providers: [TasksResolver, TasksService]
})
export class TasksModule {}
