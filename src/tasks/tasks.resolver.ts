import { Resolver } from '@nestjs/graphql'
import { Task } from './entities/task.entity'
import { type CreateTaskInput } from './dto/create-task.input'
import { type UpdateTaskInput } from './dto/update-task.input'
import { ResolverBase } from '../infra/bases/resolverBase'

@Resolver(() => Task)
export class TasksResolver extends ResolverBase<Task, CreateTaskInput, UpdateTaskInput> {
}
