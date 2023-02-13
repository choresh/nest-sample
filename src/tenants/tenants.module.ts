import { Module } from '@nestjs/common'
import { TenantsService } from './tenants.service'
import { TenantsResolver } from './tenants.resolver'
import { Tenant } from './entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantsResolver, TenantsService]
})
export class TenantsModule {}
