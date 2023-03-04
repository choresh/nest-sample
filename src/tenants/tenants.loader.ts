import { Injectable, Scope } from '@nestjs/common'
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader'
import { type Tenant } from './entities/tenant.entity'
import { TenantsService } from './tenants.service'

@Injectable({ scope: Scope.REQUEST })
export class TenantsLoader extends OrderedNestDataLoader<Tenant['_id'], Tenant> {
  constructor (private readonly service: TenantsService) {
    super()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected getOptions = () => ({
    query: async (keys: string[]) => await this.service.findByIds(keys)
  })
}
