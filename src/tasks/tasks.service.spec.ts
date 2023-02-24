import { Test } from '@nestjs/testing'
import { getModelToken } from 'nestjs-typegoose'
import { Task } from './entities/task.entity'
import { TasksService } from './tasks.service'

describe('TasksService', () => {
  let service: TasksService

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
        {
          provide: getModelToken(Task.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<TasksService>(TasksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
