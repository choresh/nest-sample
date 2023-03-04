import { Module } from '@nestjs/common'
import { TenantsService } from './tenants.service'
import { TenantsResolver } from './tenants.resolver'
import { Tenant } from './entities/tenant.entity'
import { TypegooseModule } from 'nestjs-typegoose'
import { TenantsLoader } from './tenants.loader'

@Module({
  imports: [TypegooseModule.forFeature([Tenant])],
  providers: [TenantsResolver, TenantsService, TenantsLoader]
})
export class TenantsModule {}
