import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { Tenant } from './entities/tenant.entity'
import { TenantsResolver } from './tenants.resolver'
import { TenantsService } from './tenants.service'

describe('TenantsResolver', () => {
  let resolver: TenantsResolver

  beforeEach(async () => {
    function mockModel (dto: any): any {
      this.data = dto
      this.save = () => {
        return this.data
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        TenantsService,
        TenantsResolver,
        {
          provide: getModelToken(Tenant.name),
          useValue: mockModel
        }
      ]
    }).compile()

    resolver = module.get<TenantsResolver>(TenantsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
