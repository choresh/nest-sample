import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User) private readonly _model: ReturnModelType<typeof User>
  ) {}

  async create (input: CreateUserInput): Promise<User> {
    const obj = new this._model(input)
    return await obj.save()
  }

  async findAll (): Promise<User[]> {
    return await this._model.find().populate('tasks').exec()
  }

  async findOne (id: string): Promise<User | null> {
    return await this._model.findById(id).populate('tasks')
  }

  async update (id: string, input: UpdateUserInput): Promise<User> {
    const obj = await this._model.findById(id)
    if (obj === null) {
      throw new NotFoundException('User not found')
    }
    obj.name = (input.name ?? '')
    await obj.save()
    return obj
  }

  async remove (id: string): Promise<void> {
    await this._model.remove(id)
  }
}
