import { Injectable, NotFoundException } from '@nestjs/common'
import { type CreateTenantInput } from './dto/create-tenant.input'
import { type UpdateTenantInput } from './dto/update-tenant.input'
import { Repository } from 'typeorm'
import { Tenant } from './entities/tenant.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TenantsService {
  constructor (@InjectRepository(Tenant) private readonly repository: Repository<Tenant>) {
  }

  async create (input: CreateTenantInput): Promise<Tenant> {
    return await this.repository.save(input)
  }

  async findAll (): Promise<Tenant[]> {
    return await this.repository.find()
  }

  async findOne (id: number): Promise<Tenant | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async update (id: number, input: UpdateTenantInput): Promise<Tenant> {
    const edited = await this.repository.findOne({ where: { id } })
    if (edited === null) {
      throw new NotFoundException('Tenant not found')
    }
    edited.name = (input.name ?? '')
    await edited.save()
    return edited
  }

  async remove (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
