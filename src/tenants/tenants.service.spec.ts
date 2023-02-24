import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { Tenant } from './entities/tenant.entity'
import { TenantsService } from './tenants.service'

describe('TenantsService', () => {
  let service: TenantsService

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
        {
          provide: getModelToken(Tenant.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<TenantsService>(TenantsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
