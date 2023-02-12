import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { type CreateTaskInput } from './dto/create-task.input'
import { type UpdateTaskInput } from './dto/update-task.input'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor (@InjectRepository(Task) private readonly repository: Repository<Task>) {
  }

  async create (input: CreateTaskInput): Promise<Task> {
    return await this.repository.save(input)
  }

  async findAll (): Promise<Task[]> {
    return await this.repository.find()
  }

  async findOne (id: number): Promise<Task | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async update (id: number, input: UpdateTaskInput): Promise<Task> {
    const edited = await this.repository.findOne({ where: { id } })
    if (edited === null) {
      throw new NotFoundException('Task not found')
    }
    edited.title = (input.title ?? '')
    edited.description = (input.description ?? '')
    await edited.save()
    return edited
  }

  async remove (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
