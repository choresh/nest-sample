import { Injectable } from '@nestjs/common'
import { type CreateTaskInput } from './dto/create-task.input'
import { type UpdateTaskInput } from './dto/update-task.input'

@Injectable()
export class TasksService {
  create (createTaskInput: CreateTaskInput): string {
    return 'This action adds a new task'
  }

  findAll (): string {
    return 'This action returns all tasks'
  }

  findOne (id: number): string {
    return `This action returns a #${id} task`
  }

  update (id: number, updateTaskInput: UpdateTaskInput): string {
    return `This action updates a #${id} task`
  }

  remove (id: number): string {
    return `This action removes a #${id} task`
  }
}
