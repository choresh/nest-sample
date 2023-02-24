import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { User } from './entities/user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

describe('UsersResolver', () => {
  let resolver: UsersResolver

  beforeEach(async () => {
    function mockModel (dto: any): any {
      this.data = dto
      this.save = () => {
        return this.data
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersResolver,
        {
          provide: getModelToken(User.name),
          useValue: mockModel
        }
      ]
    }).compile()

    resolver = module.get<UsersResolver>(UsersResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
