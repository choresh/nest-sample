import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'

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

  @Query(() => Task, { name: 'task' })
  async findOne (@Args('id', { type: () => Int }) id: number): Promise<Task | null> {
    return await this.tasksService.findOne(id)
  }

  @Mutation(() => Task)
  async updateTask (@Args('updateTaskInput') updateTaskInput: UpdateTaskInput): Promise<Task> {
    return await this.tasksService.update(updateTaskInput.id, updateTaskInput)
  }

  @Mutation(() => Task)
  async removeTask (@Args('id', { type: () => Int }) id: number): Promise<void> {
    await this.tasksService.remove(id)
  }
}
