import { Injectable, NotFoundException } from '@nestjs/common'
import { plugin, ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { type CreateUserInput } from './dto/create-user.input'
import { type UpdateUserInput } from './dto/update-user.input'
import { Gender, User } from './entities/user.entity'
import * as autopopulate from 'mongoose-autopopulate'
import { Field, ObjectType } from '@nestjs/graphql'

async function sleep (ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms))
}

@ObjectType()
export class GenderInfo {
  @Field()
    count: number

  @Field()
    avgAge: number
}

@ObjectType()
export class UsersInfo {
  @Field()
    females?: GenderInfo

  @Field()
    males?: GenderInfo
}

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

  async demonstrateComplexQuery (): Promise<UsersInfo> {
    const result = await this._model.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 },
          avgAgeFemales: { $avg: { $cond: [{ $eq: ['$gender', 'female'] }, '$age', null] } },
          avgAgeMales: { $avg: { $cond: [{ $eq: ['$gender', 'male'] }, '$age', null] } }
        }
      }
    ])

    const usersInfo: UsersInfo = {
    }

    result.forEach(currResult => {
      switch (currResult._id) {
        case 'female':
          usersInfo.females = {
            count: currResult.count,
            avgAge: currResult.avgAgeFemales
          }
          break
        case 'male':
          usersInfo.males = {
            count: currResult.count,
            avgAge: currResult.avgAgeMales
          }
          break
        default:
          throw new Error('Unexpected case')
      }
    })

    return usersInfo
  }

  // async demonstrateComplexQuery (): Promise<User | null> {
  //   const result = await this._model
  //     .aggregate([
  //       {
  //         $lookup: {
  //           from: 'tasks',
  //           localField: '_id',
  //           foreignField: 'userId',
  //           as: 'tasks'
  //         }
  //       }/*,
  //       {
  //         $addFields: {
  //           numTasks: { $size: '$tasks' }
  //         }
  //       }/*,
  //       {
  //         $sort: {
  //           numTasks: -1
  //         }
  //       },
  //       {
  //         $limit: 100
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           name: 1,
  //           numTasks: 1
  //         }
  //       } */
  //     ]).exec()

  //   if (result.length > 1) {
  //     throw new Error('Internal error')
  //   }
  //   return (result.length === 1)
  //     ? result[0] as User
  //     : null
  // }

  async demonstrateTransactionBlock (): Promise<User[]> {
    await this._model.db
      .transaction(async (session) => {
        await this._model.create([{ name: 'user140', tenantId: '640cdbd78e8edb268cc8f0a9', gender: Gender.male, age: 32 }], { session })
        await this._model.create([{ name: 'user141', tenantId: '640cdbd78e8edb268cc8f0a9', gender: Gender.female, age: 43 }], { session })
        throw new Error('Oops!')
      })
      .catch(err => {
        throw new Error(err)
      })

    return await this._model.find().exec()
  }

  async demonstrateTransactionFlow (): Promise<User[]> {
    const session = await this._model.db.startSession()
    session.startTransaction()

    try {
      await this._model.create([{ name: 'user136', tenantId: '640cdbd78e8edb268cc8f0a9', gender: Gender.male, age: 32 }], { session })
      await this._model.create([{ name: 'user137', tenantId: '640cdbd78e8edb268cc8f0a9', gender: Gender.female, age: 43 }], { session })
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

  async demonstrateTransactionLock (): Promise<User[]> {
    const promises: Array<Promise<void>> = []
    for (let i = 0; i < 5; i++) {
      const currPromise = this._model.db
        .transaction(async (session) => {
          console.log(`Transaction #${i} started`)
          const length1 = (await this._model.find({ session }).exec()).length
          console.log(`Transaction #${i}, length: ${length1}`)
          await this._model.create([{ name: `user'${i}`, tenantId: '640cdbd78e8edb268cc8f0a9', gender: Gender.female, age: 43 }], { session })
          console.log(`Transaction #${i}, creation done`)
          await sleep(10000)
          const length2 = (await this._model.find({ session }).exec()).length
          console.log(`Transaction #${i} ended, length: ${length2}`)
        }, { readConcern: 'majority', readPreference: 'primary', writeConcern: { w: 'majority' } }) // Transaction options sample, they allow us to define required balance between 'consistency' and 'performance'.
      promises.push(currPromise)
    }
    await Promise.all(promises)
    const length3 = (await this._model.find().exec()).length
    console.log(`All transactions ended, length: ${length3}`)
    return await this._model.find().exec()
  }
}
