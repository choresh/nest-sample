import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

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
        {
          provide: getModelToken(User.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
