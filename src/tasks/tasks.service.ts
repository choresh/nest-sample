import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { type CreateTaskInput } from './dto/create-task.input'
import { type UpdateTaskInput } from './dto/update-task.input'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor (
    @InjectModel(Task) private readonly _model: ReturnModelType<typeof Task>
  ) {}

  async create (input: CreateTaskInput): Promise<Task> {
    const obj = new this._model(input)
    return await obj.save()
  }

  async findAll (): Promise<Task[]> {
    return await this._model.find().exec()
  }

  async findOne (id: string): Promise<Task | null> {
    return await this._model.findById(id)
  }

  async update (id: string, input: UpdateTaskInput): Promise<Task> {
    const obj = await this._model.findById(id)
    if (obj === null) {
      throw new NotFoundException('Task not found')
    }
    obj.title = (input.title ?? '')
    obj.description = (input.description ?? '')
    await obj.save()
    return obj
  }

  async remove (id: string): Promise<void> {
    await this._model.remove(id)
  }
}
