import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { type CreateTenantInput } from './dto/create-tenant.input'
import { type UpdateTenantInput } from './dto/update-tenant.input'
import { Tenant } from './entities/tenant.entity'

@Injectable()
export class TenantsService {
  constructor (@InjectModel(Tenant) private readonly _model: ReturnModelType<typeof Tenant>) {
  }

  async create (input: CreateTenantInput): Promise<Tenant> {
    const obj = new this._model(input)
    return await obj.save()
  }

  async findAll (): Promise<Tenant[]> {
    return await this._model
      .find()
      .populate({
        path: 'users',
        populate: {
          path: 'tasks'
        }
      })
      .exec()
  }

  async findOne (id: string): Promise<Tenant | null> {
    return await this._model
      .findById(id)
      .populate({
        path: 'users',
        populate: {
          path: 'tasks'
        }
      })
  }

  async update (id: string, input: UpdateTenantInput): Promise<Tenant> {
    const obj = await this._model.findById(id)
    if (obj === null) {
      throw new NotFoundException('Tenant not found')
    }
    obj.name = (input.name ?? '')
    await obj.save()
    return obj
  }

  async remove (id: string): Promise<void> {
    await this._model.remove(id)
  }
}
