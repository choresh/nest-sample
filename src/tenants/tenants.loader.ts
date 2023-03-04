import * as DataLoader from 'dataloader'
import { DataloaderProvider } from '@tracworx/nestjs-dataloader'
import { type Tenant } from './entities/tenant.entity'
import { type GqlExecutionContext } from '@nestjs/graphql'
import { TenantsService } from './tenants.service'

@DataloaderProvider()
export class TenantsLoader {
  constructor (private readonly service: TenantsService) {
  }

  createDataloader (ctx: GqlExecutionContext): DataLoader<string, Tenant> {
    // const tenant = ctx.getContext().req.tenant // Use this line if need to fetch request-scoped context data
    return new DataLoader<string, Tenant>(async (ids) => await this.service.findByIds(ids))
  }
}
