import { Injectable, NotFoundException } from '@nestjs/common'
import { plugin, ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import * as autopopulate from 'mongoose-autopopulate'

@plugin(autopopulate as any)
@Injectable()
export class UsersService {
  constructor (@InjectModel(User) private readonly _model: ReturnModelType<typeof User>) {
  }

  async create (input: CreateUserInput): Promise<User> {
    const obj = new this._model(input)
    return await obj.save()
  }

  async findAll (): Promise<User[]> {
    return await this._model.find().exec()
  }

  async findOne (id: string): Promise<User | null> {
    return await this._model.findById(id)
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

  async findOneByIndex (tenantId: string, name: string): Promise<User | null> {
    return await this._model.findOne({ tenantId, name })
  }

  async demonstrateComplexQuery (): Promise<User | null> {
    const session = await this._model.db.startSession()
    session.startTransaction()

    const result = await this._model.aggregate([
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'userId',
          as: 'tasks'
        }
      },
      {
        $addFields: {
          numTasks: { $size: '$tasks' }
        }
      }/*,
      {
        $sort: {
          numTasks: -1
        }
      },
      {
        $limit: 100
      },
      {
        $project: {
          _id: 1,
          name: 1,
          numTasks: 1
        }
      } */
    ]).exec()
    if (result.length > 1) {
      throw new Error('Internal error')
    }
    return (result.length === 1)
      ? result[0] as User
      : null
  }

  async demonstrateTransactionalBlock (): Promise<User[]> {
    await this._model.db
      .transaction(async (session) => {
        await this._model.create([{ name: 'user140', tenantId: '640cdbd78e8edb268cc8f0a9' }], { session })
        await this._model.create([{ name: 'user141', tenantId: '640cdbd78e8edb268cc8f0a9' }], { session })
        throw new Error('Oops!')
      })
      .catch(err => {
        throw new Error(err)
      })

    return await this._model.find().exec()
  }

  async demonstrateTransactionalFlow (): Promise<User[]> {
    const session = await this._model.db.startSession()
    session.startTransaction()

    try {
      await this._model.create([{ name: 'user136', tenantId: '640cdbd78e8edb268cc8f0a9' }], { session })
      await this._model.create([{ name: 'user137', tenantId: '640cdbd78e8edb268cc8f0a9' }], { session })
      throw new Error('Oops!')
      // eslint-disable-next-line no-unreachable
      await session.commitTransaction()
    } catch (err) {
      await session.abortTransaction()
      throw new Error(err)
    }

    // eslint-disable-next-line no-unreachable
    return await this._model.find().exec()
  }
}
