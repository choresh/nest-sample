import { Module } from '@nestjs/common'
import { TenantsService } from './tenants.service'
import { TenantsResolver } from './tenants.resolver'
import { Tenant } from './entities/tenant.entity'
import { TypegooseModule } from 'nestjs-typegoose'
import { TenantsLoader } from './tenants.loader'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DataLoaderInterceptor } from 'nestjs-dataloader'

@Module({
  imports: [TypegooseModule.forFeature([Tenant])],
  providers: [
    TenantsResolver,
    TenantsService,
    TenantsLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    }
  ]
})
export class TenantsModule {}
