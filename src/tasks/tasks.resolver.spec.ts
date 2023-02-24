import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { Task } from './entities/task.entity'
import { TasksResolver } from './tasks.resolver'
import { TasksService } from './tasks.service'

describe('TasksResolver', () => {
  let resolver: TasksResolver

  beforeEach(async () => {
    function mockModel (dto: any): any {
      this.data = dto
      this.save = () => {
        return this.data
      }
    }

    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        TasksResolver,
        {
          provide: getModelToken(Task.name),
          useValue: mockModel
        }
      ]
    }).compile()

    resolver = module.get<TasksResolver>(TasksResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
