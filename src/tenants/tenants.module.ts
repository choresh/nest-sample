import { Module } from '@nestjs/common'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { TenantsService } from './tenants.service'
import { TenantsResolver } from './tenants.resolver'
import { Tenant } from './entities/tenant.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: Tenant.name, schema: SchemaFactory.createForClass(Tenant) }])],
  providers: [TenantsResolver, TenantsService]
})
export class TenantsModule {}
