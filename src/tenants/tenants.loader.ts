import * as DataLoader from 'dataloader'
import { Injectable } from '@nestjs/common'
import { type NestDataLoader } from 'nestjs-dataloader'
import { type Tenant } from './entities/tenant.entity'
import { TenantsService } from './tenants.service'

@Injectable()
export class TenantsLoader implements NestDataLoader<string, Tenant> {
  constructor (private readonly service: TenantsService) {
  }

  generateDataLoader (): DataLoader<string, Tenant> {
    return new DataLoader<string, Tenant>(async (keys) => await this.service.findByIds(keys))
  }
}
