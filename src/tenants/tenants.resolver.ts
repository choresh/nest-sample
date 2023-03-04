import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TenantsService } from './tenants.service'
import { Tenant } from './entities/tenant.entity'
import { CreateTenantInput } from './dto/create-tenant.input'
import { UpdateTenantInput } from './dto/update-tenant.input'
import { TenantsLoader } from './tenants.loader'
import DataLoader from 'dataloader'
import { ObjectId } from 'mongoose'
import { Loader } from 'nestjs-graphql-dataloader'

@Resolver(() => Tenant)
export class TenantsResolver {
  constructor (private readonly tenantsService: TenantsService) {
  }

  @Mutation(() => Tenant)
  async createTenant (@Args('createTenantInput') createTenantInput: CreateTenantInput): Promise<Tenant> {
    return await this.tenantsService.create(createTenantInput)
  }

  @Query(() => [Tenant], { name: 'tenants' })
  async findAll (): Promise<Tenant[]> {
    return await this.tenantsService.findAll()
  }

  @Query(() => [Tenant])
  async getTenants (
    @Args({ name: 'ids', type: () => [String] }) ids: ObjectId[],
      @Loader(TenantsLoader) loader: DataLoader<Tenant['_id'], Tenant>
  ): Promise<Array<Tenant | Error>> {
    return await loader.loadMany(ids)
  }

  @Query(() => Tenant, { name: 'tenant' })
  async findOne (
    @Args('id', { type: () => String }) id: ObjectId,
      @Loader(TenantsLoader) loader: DataLoader<Tenant['_id'], Tenant>
  ): Promise<Tenant> {
    return await loader.load(id)
  }

  @Mutation(() => Tenant)
  async updateTenant (@Args('updateTenantInput') updateTenantInput: UpdateTenantInput): Promise<Tenant> {
    return await this.tenantsService.update(updateTenantInput.id, updateTenantInput)
  }

  @Mutation(() => Tenant)
  async removeTenant (@Args('id', { type: () => String }) id: string): Promise<void> {
    await this.tenantsService.remove(id)
  }
}
/*
function Loader(TenantsLoader: typeof TenantsLoader) {
  throw new Error('Function not implemented.')
}
*/
