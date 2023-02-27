import { Resolver } from '@nestjs/graphql'
import { Tenant } from './entities/tenant.entity'
import { type CreateTenantInput } from './dto/create-tenant.input'
import { type UpdateTenantInput } from './dto/update-tenant.input'
import { ResolverBase } from '../infra/bases/resolverBase'

@Resolver(() => Tenant)
export class TenantsResolver extends ResolverBase<Tenant, CreateTenantInput, UpdateTenantInput> {
}
