import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, type HydratedDocument } from 'mongoose'
import { type CreateTenantInput } from './dto/create-tenant.input'
import { type UpdateTenantInput } from './dto/update-tenant.input'
import { Tenant } from './entities/tenant.entity'

@Injectable()
export class TenantsService {
  constructor (@InjectModel(Tenant.name) private readonly _model: Model<HydratedDocument<Tenant>>) {
  }

  async create (input: CreateTenantInput): Promise<Tenant> {
    const obj = new this._model(input)
    return await obj.save()
  }

  async findAll (): Promise<Tenant[]> {
    return await this._model.find().exec()
  }

  async findOne (id: string): Promise<Tenant | null> {
    return await this._model.findById(id)
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
