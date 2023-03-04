import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'
import { TasksLoader } from './tasks.loader'
import DataLoader from 'dataloader'
import { ObjectId } from 'mongoose'
import { Loader } from 'nestjs-graphql-dataloader'

@Resolver(() => Task)
export class TasksResolver {
  constructor (private readonly tasksService: TasksService) {
  }

  @Mutation(() => Task)
  async createTask (@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    return await this.tasksService.create(createTaskInput)
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll (): Promise<Task[]> {
    return await this.tasksService.findAll()
  }

  @Query(() => [Task])
  async getTasks (
    @Args({ name: 'ids', type: () => [String] }) ids: ObjectId[],
      @Loader(TasksLoader) loader: DataLoader<Task['_id'], Task>
  ): Promise<Array<Task | Error>> {
    return await loader.loadMany(ids)
  }

  @Query(() => Task, { name: 'task' })
  async findOne (
    @Args('id', { type: () => String }) id: ObjectId,
      @Loader(TasksLoader) loader: DataLoader<Task['_id'], Task>
  ): Promise<Task> {
    return await loader.load(id)
  }

  @Mutation(() => Task)
  async updateTask (@Args('updateTaskInput') updateTaskInput: UpdateTaskInput): Promise<Task> {
    return await this.tasksService.update(updateTaskInput.id, updateTaskInput)
  }

  @Mutation(() => Task)
  async removeTask (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.tasksService.remove(id)
  }
}
/*
function Loader(TasksLoader: typeof TasksLoader) {
  throw new Error('Function not implemented.')
}
*/
