import { Module } from '@nestjs/common'
import { TenantsService } from './tenants.service'
import { TenantsResolver } from './tenants.resolver'
import { Tenant } from './entities/tenant.entity'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [TypegooseModule.forFeature([Tenant])],
  providers: [TenantsResolver, TenantsService]
})
export class TenantsModule {}
